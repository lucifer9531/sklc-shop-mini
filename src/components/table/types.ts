import { CSSProperties, PropsWithChildren } from 'react';

export interface AnyOpt {
	[prop: string]: any;
}

export type FixedType = 'left' | 'right';
export type SortOrder = 'ascend' | 'descend' | undefined;
export type CompareFn<T = AnyOpt> = (a: T, b: T, sortOrder: SortOrder) => number;

export interface IColumns {
	title: string | JSX.Element;
	dataIndex: string;
	key?: string;
	align?: 'left' | 'right' | 'center';
	style?: CSSProperties;
	titleStyle?: CSSProperties;
	className?: string;
	titleClassName?: string;
	render?: (text?: any, record?: AnyOpt, index?: number) => JSX.Element | string;
	width?: number;
	sort?: boolean;
	sortOrder?: SortOrder;
	sorter?: CompareFn | boolean;
	sortLevel?: number;
	onSort?: (sortOrder: SortOrder) => void;
	fixed?: FixedType;
	expandable?: boolean;
}

export interface Props extends PropsWithChildren<any> {
	columns: IColumns[];
	dataSource: AnyOpt[];
	rowKey: string;
	className?: string;
	style?: CSSProperties;
	colStyle?: CSSProperties;
	colClassName?: string;
	rowStyle?: CSSProperties;
	rowClassName?: string;
	titleStyle?: CSSProperties;
	titleClassName?: string;
	loading?: boolean;
	onChange?: (dataSource: AnyOpt[]) => void;
	multipleSort?: boolean;

	scroll?: {
		x?: number | string | boolean,
		y?: number | string | boolean,
	};
}
