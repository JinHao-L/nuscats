export const IsDev: boolean = process.env["NODE_ENV"] === "development"

export const BackendApiBaseUrl = IsDev ? "http://localhost:3001" : process.env["REACT_APP_BACKEND_API_URL"]

export const PositionStackApiKey = process.env["REACT_APP_POSITIONSTACK_API_KEY"]