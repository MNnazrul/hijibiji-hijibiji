# HTTP Status Codes for REST APIs

HTTP status codes indicate the result of a request. These are categorized into five groups:

## 1. Informational Responses (1xx)

- **100 Continue** – The server acknowledges part of the request and is waiting for the rest.
- **101 Switching Protocols** – The client has requested the server to switch protocols (e.g., from HTTP to WebSocket).
- **102 Processing** – The server has received the request and is processing it.

---

## 2. Success Responses (2xx)

- **200 OK** – The request was successful.
- **201 Created** – A new resource was successfully created.
- **202 Accepted** – The request has been accepted but not yet processed.
- **203 Non-Authoritative Information** – The response is from a third-party source.
- **204 No Content** – The request was successful, but there’s no content to return.
- **205 Reset Content** – Instructs the client to reset the view.
- **206 Partial Content** – The server is only returning part of the requested resource.

---

## 3. Redirection Responses (3xx)

- **300 Multiple Choices** – More than one possible response exists.
- **301 Moved Permanently** – The resource has been permanently moved.
- **302 Found** – The resource is temporarily moved.
- **303 See Other** – The client should request a different URL.
- **304 Not Modified** – The resource hasn’t changed since the last request.
- **307 Temporary Redirect** – Similar to `302`, but the method remains unchanged.
- **308 Permanent Redirect** – Like `301`, but the method remains unchanged.

---

## 4. Client Error Responses (4xx)

- **400 Bad Request** – The request is malformed.
- **401 Unauthorized** – Authentication is required.
- **402 Payment Required** – Reserved for future use.
- **403 Forbidden** – The client is authenticated but lacks permission.
- **404 Not Found** – The resource doesn’t exist.
- **405 Method Not Allowed** – The HTTP method is not supported.
- **406 Not Acceptable** – The server cannot fulfill the request with the requested format.
- **407 Proxy Authentication Required** – Authentication is required for a proxy.
- **408 Request Timeout** – The request took too long.
- **409 Conflict** – The request conflicts with the server's state.
- **410 Gone** – The resource was previously available but is now permanently gone.
- **411 Length Required** – The server requires a `Content-Length` header.
- **412 Precondition Failed** – The client’s conditions were not met.
- **413 Payload Too Large** – The request body is too large.
- **414 URI Too Long** – The URL is too long to be processed.
- **415 Unsupported Media Type** – The media type is not supported.
- **416 Range Not Satisfiable** – The requested range is invalid.
- **417 Expectation Failed** – The server cannot meet the request’s `Expect` header.
- **418 I'm a teapot** – A joke response ([RFC 2324](https://datatracker.ietf.org/doc/html/rfc2324)).
- **422 Unprocessable Entity** – The request was well-formed but contains semantic errors.
- **429 Too Many Requests** – The client sent too many requests in a short time.

---

## 5. Server Error Responses (5xx)

- **500 Internal Server Error** – A general server error occurred.
- **501 Not Implemented** – The server does not support the requested method.
- **502 Bad Gateway** – The server received an invalid response from an upstream server.
- **503 Service Unavailable** – The server is temporarily unavailable.
- **504 Gateway Timeout** – The server didn’t receive a timely response from another server.
- **505 HTTP Version Not Supported** – The HTTP version is not supported.

---

## Commonly Used Status Codes in REST APIs

| Status Code | Meaning                                                    |
| ----------- | ---------------------------------------------------------- |
| **200**     | OK (Success)                                               |
| **201**     | Created (Resource successfully created)                    |
| **204**     | No Content (Successful request, but no data returned)      |
| **400**     | Bad Request (Invalid input)                                |
| **401**     | Unauthorized (Authentication required)                     |
| **403**     | Forbidden (Permission denied)                              |
| **404**     | Not Found (Resource not found)                             |
| **405**     | Method Not Allowed (Invalid HTTP method)                   |
| **409**     | Conflict (Duplicate request or conflicting state)          |
| **422**     | Unprocessable Entity (Validation failed)                   |
| **500**     | Internal Server Error (Something went wrong on the server) |

Would you like specific examples of how to handle these status codes in Django REST API? 🚀
