import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { ScrollView, Text, View } from '@tarojs/components';
import './index.scss';
import { AnyOpt, CompareFn, FixedType, IColumns, Props, SortOrder } from './types';

const DEFAULT_COL_WIDTH = 100;
const JC_TA_MAP = {
	'left': 'flex-start',
	'center': 'center',
	'right': 'flex-end',
};

const getSize = (size: string | number): string => {
	if (typeof size === 'number') {
		return Taro.pxTransform((size as number) * 2);
	} else {
		return String(size);
	}
};

const compare = (a, b, sortOrder: SortOrder = 'ascend'): number => {
	// eslint-disable-next-line no-restricted-globals
	if (isNaN(Number(a)) || isNaN(Number(b))) {
		if (sortOrder === 'ascend') {
			return a.localeCompare(b);
		} else {
			return b.localeCompare(a);
		}
	}
	if (sortOrder === 'ascend') {
		return (Number(a || 0) - Number(b || 0)) || 0;
	} else {
		return (Number(b || 0) - Number(a || 0)) || 0;
	}
};

const doSort = (opts: { columns: IColumns[]; dataSource: AnyOpt[] }) => {
	const {columns, dataSource} = opts;
	const sortColumns: IColumns[] = columns.filter(item => item.sortOrder) || [];
	if (sortColumns.length === 0) {
		return dataSource;
	}
	sortColumns.sort((a, b): number => {
		return (a.sortLevel || 0) - (b.sortLevel || 0);
	});
	let result: AnyOpt[] = dataSource;
	sortColumns.forEach((column: IColumns) => {
		const dataIndex: string = column.dataIndex;
		const sortOrder: SortOrder = column.sortOrder;
		const sorter: CompareFn | boolean | undefined = column.sorter;

		const temp: AnyOpt[] = [...result];

		temp.sort((a, b): number => {
			if (sorter) {
				if (typeof sorter === 'function') {
					return sorter(a, b, sortOrder);
				} else {
					return 0;
				}
			}
			return compare(a[dataIndex], b[dataIndex], sortOrder);
		});

		result = temp;
	});

	return result;
};

const calculateFixedDistance = (opt: { fixedType: FixedType; index: number; columns: IColumns[] }) => {
	const {fixedType, index, columns} = opt;
	let result: number;
	if (fixedType === 'left') {
		result = columns.reduce(function (prev, cur, i) {
			if ((i + 1) <= index) {
				return prev + (cur.width || DEFAULT_COL_WIDTH);
			} else {
				return prev;
			}
		}, 0);
	} else {
		result = columns.reduceRight(function (prev, cur, i) {
			if ((i - 1) >= index) {
				return prev + (cur.width || DEFAULT_COL_WIDTH);
			} else {
				return prev;
			}
		}, 0);
	}

	return getSize(result);
};

const Loading = () => {
	return (
		<View className='table_loading'>
			<View className='table_circle' />
		</View>
	);
};

const Empty = () => {
	return (
		<View className='table_empty'>
			<Text>暂无数据</Text>
		</View>
	);
};

const Table = (props: Props): JSX.Element | null => {
	const {
		columns: pColumns = [],
		dataSource: pDataSource = [],
		rowKey = '',
		loading = false,
		className = '',
		style = {},
		titleClassName = '',
		titleStyle = {},
		rowClassName = '',
		rowStyle = {},
		colStyle = {},
		colClassName = '',
		onChange = (): void => {
		},
		multipleSort = false,
		scroll = {}
	} = props;

	const [dataSource, setDataSource] = useState<AnyOpt[]>(pDataSource);
	const [columns, setColumns] = useState<IColumns[]>(pColumns);

	useEffect(() => {
		onChange(dataSource);
	}, [dataSource]);

	useDeepCompareEffect(() => {
		setColumns(pColumns);
	}, [pColumns]);

	useEffect(() => {
		const result = doSort({columns, dataSource: pDataSource});
		setDataSource(result);
	}, [columns, pColumns, pDataSource]);

	const handleClickTitle = useCallback((item: IColumns, index: number): void => {
		if (!item.sort || loading) {
			return;
		}

		const temp: IColumns[] = [...columns];

		if (!multipleSort) {
			temp.forEach((j: IColumns, i: number): void => {
				if (i !== index) {
					delete j.sortOrder;
				}
			});
		}

		const array: SortOrder[] = ['ascend', 'descend', undefined];
		const curr: number = array.indexOf(temp[index].sortOrder);
		const next: SortOrder = temp[index].sortOrder = array[(curr + 1) % array.length];
		item.onSort && item.onSort(next);
		setColumns(temp);
	}, [columns, loading]);

	// eslint-disable-next-line @typescript-eslint/no-shadow
	const Title = (props: { key: any, column: IColumns, index: number }): JSX.Element => {
		const {
			column,
			index,
		} = props;

		return (
			<View
  onClick={handleClickTitle.bind(this, column, index)}
  className={classnames({
					'table_title': true,
					'table_fixed': column.fixed,
					[column.titleClassName || '']: true,
					[titleClassName]: true,
				})}
  style={{
					[column.fixed as string]: column.fixed && calculateFixedDistance({fixedType: column.fixed, index, columns}),
					width: getSize(column.width || DEFAULT_COL_WIDTH),
					...column.titleStyle,
					...titleStyle,
					justifyContent: column.align && JC_TA_MAP[column.align]
				}}
  key={column.key || column.dataIndex}
			><Text>{column.title}</Text>
				{
					column.sort && (
						<View className='table_sortBtn'>
							<View className={classnames({
								'table_btn': true,
								'table_ascend': true,
								'table_active': (column.sortOrder === 'ascend')
							})}
							/>
							<View className={classnames({
								'table_btn': true,
								'table_descend': true,
								'table_active': (column.sortOrder === 'descend')
							})}
							/>
						</View>
					)
				}
			</View>
		);
	};

	// eslint-disable-next-line @typescript-eslint/no-shadow
	const Row = (props: { key: any, dataSourceItem: AnyOpt, index: number }): JSX.Element => {
		const {
			dataSourceItem,
			index
		} = props;

		return (
			<View
  key={dataSourceItem[rowKey]}
  className={classnames({
					'table_row': true,
					[rowClassName]: true,
				})}
  style={{...rowStyle, background: index % 2 === 0 ? '#fff' : '#f3f3f3'}}
			>
				{
					columns.map((columnItem: IColumns, colIndex: number): JSX.Element => {
						const text = dataSourceItem[columnItem.dataIndex];
						let result;

						if (columnItem.render) {
							const render = columnItem.render(text, dataSourceItem, index);

							if (typeof render !== 'object') {
								result = (<Text>{render}</Text>);
							} else {
								result = render;
							}
						} else {
							result = (<Text>{String(text)}</Text>);
						}

						return (
							<View
  key={columnItem.key || columnItem.dataIndex}
  className={classnames({
									[colClassName]: true,
									'table_col': true,
									'table_fixed': columnItem.fixed,
									[columnItem.className as string]: true
								})}
  style={{
									textAlign: columnItem.align || 'center',
									width: getSize(columnItem.width || DEFAULT_COL_WIDTH),
									[columnItem.fixed as string]: columnItem.fixed && calculateFixedDistance({fixedType: columnItem.fixed, index: colIndex, columns}),
									...columnItem.style,
									...colStyle,
                  background: index % 2 === 0 ? '#fff' : '#f3f3f3'
								}}
							>{result}</View>
						);
					})
				}
			</View>
		);
	};

	const wrapWidth = useMemo((): number => {
		return columns.reduce(function (prev, cur) {
			return prev + (cur.width || DEFAULT_COL_WIDTH);
		}, 0);
	}, [columns]);

	return (
		<View
  className={classnames(['table', className])}
  style={{
				width: wrapWidth,
				...style
			}}
		>
			{loading && (<Loading />)}
			<ScrollView
  className='table_table'
  scroll-x={(dataSource.length !== 0) && (scroll.x)}
  scroll-y={scroll.y}
  style={{
					maxWidth: getSize(scroll.x as number | string),
					maxHeight: getSize(scroll.y as number | string),
				}}
			>
				<View
  className={classnames({
						'table_head': true,
						'table_scroll': scroll.y,
					})}
				>
					{
						(columns.length === 0) ? (
							<Empty />
						) : columns.map((item: IColumns, index: number): JSX.Element => {
							return (
								<Title
  key={item.key || item.dataIndex}
  column={item}
  index={index}
								/>
							);
						})
					}
				</View>
				<View className='table_body'>
					{
						(dataSource.length > 0) ? dataSource.map((dataSourceItem: AnyOpt, index: number): JSX.Element => {
							return (
								<Row key={dataSourceItem[rowKey]} dataSourceItem={dataSourceItem} index={index} />
							);
						}) : (<Empty />)
					}
				</View>
			</ScrollView>
		</View>
	);
};

export default memo(Table);
