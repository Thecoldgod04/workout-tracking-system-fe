export const useApp = () => {
    const backendUrl = 'http://localhost:8080';
    const toast = useToast();

    const defaultSuccessMessage = 'Action performed successfully!';
    const defaultErrorMessage = 'An error occurred!'

    // ---------------- Functions ----------------

    async function request(
        method, 
        endpoint, 
        params, 
        body, 
        hideAlert = true, 
        successMessage = defaultSuccessMessage, 
        errorMessage = defaultErrorMessage
    ) {
        let url = backendUrl + endpoint;

        if(params) {
            url += "?"
            params.forEach(element => {
                url += element.key + '=' + element.value + '&';
            });
        }

        try {
            const requestData = {
                method: method,
                credentials: 'include', // Ensure cookies are sent with requests
                headers: {
                    'Content-Type': 'application/json',
                },
                ...(body ? { body: JSON.stringify(body) } : {}) // Only add 'body' if 'body' is not null
            };
            const response = await fetch(url, requestData);
            const data = await response.json();
            
            if(!response.ok) { throw new Error(data?.message || errorMessage); }

            if(!hideAlert) {
                toast.add({
                    title: 'Success',
                    description: successMessage,
                    icon: 'i-heroicons-check-circle-solid',
                });
            }

            return data;
        }
        catch(error) {
            console.log('Error', error);
            if(hideAlert) return;
            toast.add({
                title: 'Error',
                description: errorMessage,
                icon: 'i-heroicons-x-circle-solid',
                color: 'red'
            });
        }
    }

    return {
        backendUrl,
        defaultSuccessMessage,
        defaultErrorMessage,
        toast,
        request,
    }
}
