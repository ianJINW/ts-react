import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

export const useFetchData = (url: string): UseQueryResult<any, Error> => {
	console.log(url);
	return useQuery({
		queryKey: ["data"],
		queryFn: () => axios.get(url).then((res) => res.data),
	});
};
