export const useApp = () => {
    const backendUrl = 'http://localhost:8080';
    const toast = useToast();

    const defaultSuccessMessage = 'Action performed successfully!';
    const defaultErrorMessage = 'An error occurred!'

    // ---------------- Functions ----------------

    async function request(method, endpoint, body, onSuccess = null, onError = null, successMessage = defaultSuccessMessage, errorMessage = defaultErrorMessage) {
        const url = backendUrl + endpoint;
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }).then(
                toast.add({
                    title: 'Success',
                    description: successMessage,
                    icon: 'i-heroicons-check-circle-solid',
                }),
                onSuccess()
            );
        }
        catch(error) {
            console.log('Error', error);
            toast.add({
                title: 'Error',
                description: errorMessage,
                icon: 'i-heroicons-x-circle-solid',
                color: 'red'
            });
            onError();
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
