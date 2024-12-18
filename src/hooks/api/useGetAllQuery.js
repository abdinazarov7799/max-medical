import {useQuery} from 'react-query'
import {request} from "../../services/api";
import {notification} from "antd";
import {get} from "lodash";

const useGetAllQuery = ({
                            key = "get-all",
                            url = "/",
                            params = {},
                            showSuccessMsg = false,
                            hideErrorMsg = false,
                            enabled = true,
                        }) => {

    const {isLoading, isError, data, error, isFetching, refetch} = useQuery(key, () => request.get(url, params), {
        onSuccess: () => {
        },
        onError: (data) => {
            if (!hideErrorMsg) {
                get(data,'response.data.errors',[])?.map((err) => (
                    notification.error({message: get(err, 'errorMsg') || `ХАТО!!! ${url} api ишламаяпти`})
                ))
            }
        },
        enabled
    });

    return {
        isLoading,
        isError,
        data,
        error,
        isFetching,
        refetch
    }
};

export default useGetAllQuery;
