import {useQuery} from 'react-query';
import {request} from "../../services/api";
import {notification} from "antd";
import {get} from "lodash";

const fetchRequest = (url, params) => request.get(url, {params});

const useGetOneQuery = (
    {
        id = null,
        key = "get-one",
        url = "test",
        enabled = true,
        params = {},
        showSuccessMsg = false,
        showErrorMsg = true
    }
) => {
    const {isLoading, isError, data, error, refetch} = useQuery([key, id], () => fetchRequest(`${url}/${id}`, params), {
        onSuccess: () => {
        },
        onError: (data) => {
            if (showErrorMsg) {
                get(data, 'response.data.errors', []).map((err) => (
                    notification.error({message: get(err, 'errorMsg') || 'XATO!!! api ishlamaяpти'})
                ));
            }
        },
        enabled,
    });

    return {
        isLoading,
        isError,
        data,
        error,
        refetch,
    };
};

export default useGetOneQuery;
