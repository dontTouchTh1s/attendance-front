import useSWR from "swr";
import Api from "../Api";

async function fetcher(url) {
    return Api.get(url).then(response => response.data.data);
}

function useGroupPolicies() {
    const {data, error, isLoading} = useSWR('/employees', fetcher);

    return {
        employees: data,
        employeesError: error,
        employeesIsLoading: isLoading
    }
}

export default useGroupPolicies;