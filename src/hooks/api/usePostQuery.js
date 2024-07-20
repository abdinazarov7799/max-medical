import { useMutation, useQueryClient } from 'react-query';
import { request } from "../../services/api";
import { notification } from "antd";
import { get } from "lodash";

const postRequest = (url, attributes, config = {}) => request.post(url, attributes, config);

const usePostQuery = ({ hideSuccessToast = false, listKeyId = null }) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading, isError, error, isFetching } = useMutation(
        ({ url, attributes, config = {} }) => postRequest(url, attributes, config),
        {
            onSuccess: (data) => {
                if (!hideSuccessToast) {
                    notification.success({ message: data?.data?.message || 'Success' });
                }

                if (listKeyId) {
                    queryClient.invalidateQueries(listKeyId);
                }
            },
            onError: (data) => {
                get(data, 'response.data.errors', []).map((err) => (
                    notification.error({ message: get(err, 'errorMsg') || 'Error' })
                ));
            }
        }
    );

    return {
        mutate,
        isLoading,
        isError,
        error,
        isFetching,
    };
};

export default usePostQuery;
