import {useMutation, useQueryClient} from 'react-query';
import {request} from "../../services/api";
import {notification} from "antd";
import {get} from "lodash";

const deleteRequest = (url) => request.delete(url);

const useDeleteQuery = ({listKeyId = null}) => {
    const queryClient = useQueryClient();

    const {mutate, isLoading, isError, error, isFetching} = useMutation(
        ({ url }) => deleteRequest(url),
        {
            onSuccess: (data) => {
                notification.success({message: data?.data?.message || 'МУВАФФАҚИЯТЛИ ЎЧИРИЛДИ'});

                if (listKeyId) {
                    queryClient.invalidateQueries(listKeyId);
                }
            },
            onError: (data) => {
                get(data, 'response.data.errors', []).map((err) => (
                    notification.error({message: get(err, 'errorMsg') || 'ХАТО'})
                ));
            }
        }
    );

    return {
        mutate,
        isLoading,
        isError,
        error,
        isFetching
    };
};

export default useDeleteQuery;
