import useSWR from "swr";
import Api from "../Api";

async function fetcher(url) {
    return Api.get(url).then(response => response.data);
}

function useGroupPolicies() {
    const {data, error, isLoading} = useSWR('/group-policies', fetcher);

    return {
        groupPolicies: data,
        groupPoliciesError: error,
        groupPoliciesIsLoading: isLoading
    }
}

export default useGroupPolicies;