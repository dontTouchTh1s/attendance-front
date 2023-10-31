import useSWR from "swr";
import Api from "../Api";

async function fetcher(url) {
    return Api.get(url).then(response => response.data);
}

function useGroupPolicies() {
    const {data, error, isLoading} = useSWR('/auth/employee', fetcher);

    return {
        employee: data,
        employeeError: error,
        employeeIsLoading: isLoading
    }
}

export default useGroupPolicies;