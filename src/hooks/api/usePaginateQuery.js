import { useQuery } from "react-query";
import { request } from "../../services/api";
import { notification } from "antd";
import { get } from "lodash";

const usePaginateQuery = ({
                            key = "get-all",
                            url = "/",
                            page = 1,
                            params = {},
                            showSuccessMsg = false,
                            showErrorMsg = false,
                          }) => {
  const { isLoading, isError, data, error, isFetching, refetch } = useQuery(
      [key, page, params],
      () => request.get(`${url}?page=${page}`, { params }),
      {
        keepPreviousData: true,
        onSuccess: () => {
          if (showSuccessMsg) {
            notification.success({ message: 'Success' });
          }
        },
        onError: (data) => {
          if (showErrorMsg) {
            get(data, 'response.data.errors', []).map((err) => (
                notification.error({ message: get(err, 'errorMsg') || 'ERROR' })
            ));
          }
        },
      }
  );

  return {
    isLoading,
    isError,
    data,
    error,
    isFetching,
    refetch
  };
};

export default usePaginateQuery;
