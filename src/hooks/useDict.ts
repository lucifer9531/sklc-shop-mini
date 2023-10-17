import { useState } from "react";
import { getDictValueByKey } from "@/api/dict";
import { useAsyncEffect } from "ahooks";

const useDict = (dictKey: string) => {

	const [dictionary, setDictionary] = useState<any[]>([]);

	useAsyncEffect( async () => {
		await fetchDictValueByKey(dictKey);
	}, [dictKey]);

	const fetchDictValueByKey = async (key: string) => {
		const { data: { data } } = await getDictValueByKey({ key });
		setDictionary(JSON.parse(data));
	};

	const getValue = (dict: string) => {
		return dictionary.find(item => item.type === dict)?.desc || '--';
	};

	const getAllDictValues = () => {
		return dictionary || [];
	};

	return {
		getValue,
		getAllDictValues,
	}
}

export default useDict;
