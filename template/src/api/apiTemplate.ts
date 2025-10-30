type ApiTemplateArguments = {
    payload?: any;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    endpoint: string;
    isAuthenticationRequired?: boolean;
    isFormData?: boolean;
    baseUrl: string;
    token?: string | null;
    responseType?: "json" | "blob";
};

function buildHeaders(
    isFormData: boolean,
    isAuthenticationRequired: boolean,
    token: string | null
): Record<string, string> {
    const headers: Record<string, string> = {};
    if (!isFormData) {
        headers["Content-Type"] = "application/json";
        headers["Accept"] = "application/json";
    }
    if (isAuthenticationRequired) {
        if (!token) throw new Error("Token is required but not available");
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}

function buildFormData(payload: Record<string, any>): FormData {
    const formData = new FormData();
    Object.entries(payload ?? {}).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (typeof value === "object") {
            formData.append(key, JSON.stringify(value));
        } else {
            formData.append(key, String(value));
        }
    });
    return formData;
}

export const apiTemplate = async function apiTemplate<TResponse>({
    payload = {},
    method = "GET",
    endpoint = "",
    isAuthenticationRequired = false,
    isFormData = false,
    baseUrl,
    token = null,
    responseType = "json",
}: ApiTemplateArguments): Promise<TResponse> {
    if (!baseUrl) throw new Error("Base URL not found");

    const fullUrl = `${baseUrl}${endpoint}`;
    const headers = buildHeaders(isFormData, isAuthenticationRequired, token);

    let body: BodyInit | undefined;
    if (method !== "GET" && payload) {
        body = isFormData ? buildFormData(payload) : JSON.stringify(payload);
    }

    const response = await fetch(fullUrl, {
        method,
        headers,
        body,
    });

    if (!response.ok) {
        const errorData = await response.json();
        const error: any = new Error(errorData?.detail ?? errorData?.message ?? "API error");
        error.status = response.status;
        error.data = errorData;
        throw error;
    }

    if (responseType === "blob") {
        return response.blob() as Promise<TResponse>;
    } else {
        const data = await response.json();
        if (data?.type === "FALSE" || data?.success === false || data?.status === false) {
            const error: any = new Error(data?.message ?? data?.error ?? "Operation failed");
            error.status = 460;
            error.data = data;
            throw error;
        }
        return data as TResponse;
    }
};
