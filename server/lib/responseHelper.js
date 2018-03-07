module.exports = {
    success_send: (code, data, response) => {
        response
            .status(code)
            .send(data);
    },
    success_status: (code, response) => {
        response.sendStatus(code);
    },
    success_code: (code, msg) => {
        switch (code) {
            case 100 : return ({ status: 100, msg: msg }); // 100(계속): 요청자는 요청을 계속해야 한다. 서버는 이 코드를 제공하여 요청의 첫 번째 부분을 받았으며 나머지를 기다리고 있음을 나타낸다.
            case 101: return ({ status: 101, msg: msg }); //101(프로토콜 전환): 요청자가 서버에 프로토콜 전환을 요청했으며 서버는 이를 승인하는 중이다.
            case 102: return ({ status: 102, msg: msg }); // 102(처리)
            case 200: return ({ status: 200, msg: msg }); // 200(성공): 서버가 요청을 제대로 처리했다는 뜻이다. 이는 주로 서버가 요청한 페이지를 제공했다는 의미로 쓰인다.
            default: return ({ status: 200, msg: msg });
        }
    },
    err_send: (type, response) => {
        switch (type) {
            case 'InvalidQueryParameterValue': return response.status(400).send(type);//An invalid value was specified for one of the query parameters in the request URI
            case 'InvalidXmlNodeValue': return response.status(400).send(type); //The value provided for one of the XML nodes in the request body was not in the correct format
            case 'InvalidAuthenticationInfo': return response.status(400).send(type); //The authentication information was not provided in the correct format. Verify the value of Authorization header.
            case 'InvalidAuthenticationEmail': return response.status(400).send(type); //The authentication email was not provided in the correct value.
            case 'InvalidAuthenticationPassword': return response.status(400).send(type); //The authentication password was not provided in the correct value.
            case 'OutOfRangeInput': return response.status(400).send(type); //One of the request inputs is out of range.
            case 'InvalidInput': return response.status(400).send(type); //One of the request inputs is not valid.
            case 'InvalidMetadata': return response.status(400).send(type); //The specified metadata is invalid. It includes characters that are not permitted.
            case 'InvalidResourceName': return response.status(400).send(type); //The specifed resource name contains invalid characters.

            case 'AuthenticationFailed': return response.status(403).send(type); //Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.
            case 'InsufficientAccountPermissions': return response.status(403).send(type); //Read operations are currently disabled.
            case 'ResourceNotFound': return response.status(404).send(type); // The specified resource does not exist.
            case 'UnsupportedHttpVerb': return response.status(405).send(type); // The resource doesn't support the specified HTTP verb.
            case 'AccountAlreadyExists': return response.status(409).send(type);//The specified account already exists.
            case 'AccountBeingCreated': return response.status(409).send(type);//The specified account is in the process of being created.
            case 'ResourceAlreadyExists': return response.status(409).send(type);//The specified resource already exists.
            case 'EmailAlreadyExists': return response.status(409).send(type);//The specified resource already exists.
            case 'ResourceTypeMismatch': return response.status(409).send(type);//The specified resource type does not match the type of the existing resource.
            case 'MissingContentLengthHeader': return response.status(411).send(type);//The Content-Length header was not specified.
            case 'ConditionNotMet': return response.status(412).send(type);//The condition specified in the conditional header(s) was not met for a write operation.
            case 'RequestBodyTooLarge': return response.status(413).send(type);//The size of the request body exceeds the maximum size permitted.
            case 'InvalidRange': return response.status(416).send(type);//The range specified is invalid for the current size of the resource.

            case 'InternalError': return response.status(500).send(type);//The specified resource already exists.
            case 'OperationTimedOut': return response.status(500).send(type);//The operation could not be completed within the permitted time.
            case 'ServerBusy': return response.status(503).send(type);//The server is currently unable to receive requests. Please retry your request.
            default: return response.status(400).send(type);
        }
    },
    err_code: (code, errorMsg, response) => {
        switch (code) {
            case 400: return response.status(400).send(errorMsg); // 400(잘못된 요청): 서버가 요청의 구문을 인식하지 못했다.
            case 401: return response.status(400).send(errorMsg); //401(권한 없음): 이 요청은 인증이 필요한다. 서버는 로그인이 필요한 페이지에 대해 이 요청을 제공할 수 있다.
            case 403: return response.status(400).send(errorMsg); //403(금지됨): 서버가 요청을 거부하고 있다.
            case 404: return response.status(400).send(errorMsg); //404(찾을 수 없음): 서버가 요청한 페이지를 찾을 수 없다. 예를 들어 서버에 존재하지 않는 페이지에 대한 요청이 있을 경우 서버는 이 코드를 제공한다.
            case 405: return response.status(400).send(errorMsg); //405(허용되지 않는 방법): 요청에 지정된 방법을 사용할 수 없다.
            case 406: return response.status(400).send(errorMsg); //406(허용되지 않음): 요청한 페이지가 요청한 콘텐츠 특성으로 응답할 수 없다.
            case 407: return response.status(400).send(errorMsg); //407(프록시 인증 필요): 이 상태 코드는 401(권한 없음)과 비슷하지만 요청자가 프록시를 사용하여 인증해야 한다. 서버가 이 응답을 표시하면 요청자가 사용할 프록시를 가리키는 것이기도 한다.
            case 408: return response.status(400).send(errorMsg); //408(요청 시간초과): 서버의 요청 대기가 시간을 초과하였다.
            case 409: return response.status(400).send(errorMsg); //409(충돌): 서버가 요청을 수행하는 중에 충돌이 발생했다. 서버는 응답할 때 충돌에 대한 정보를 포함해야 한다. 서버는 PUT 요청과 충돌하는 PUT 요청에 대한 응답으로 이 코드를 요청 간 차이점 목록과 함께 표시해야 한다.
            case 410: return response.status(400).send(errorMsg); //410(사라짐): 서버는 요청한 리소스가 영구적으로 삭제되었을 때 이 응답을 표시한다. 404(찾을 수 없음) 코드와 비슷하며 이전에 있었지만 더 이상 존재하지 않는 리소스에 대해 404 대신 사용하기도 한다. 리소스가 영구적으로 이동된 경우 301을 사용하여 리소스의 새 위치를 지정해야 한다.
            case 411: return response.status(400).send(errorMsg); //411(길이 필요): 서버는 유효한 콘텐츠 길이 헤더 입력란 없이는 요청을 수락하지 않는다.
            case 412: return response.status(400).send(errorMsg); //412(사전조건 실패): 서버가 요청자가 요청 시 부과한 사전조건을 만족하지 않는다.
            case 413: return response.status(400).send(errorMsg); //413(요청 속성이 너무 큼): 요청이 너무 커서 서버가 처리할 수 없다.
            case 414: return response.status(400).send(errorMsg); //414(요청 URI가 너무 긺): 요청 URI(일반적으로 URL)가 너무 길어 서버가 처리할 수 없다.
            case 415: return response.status(400).send(errorMsg); //415(지원되지 않는 미디어 유형): 요청이 요청한 페이지에서 지원하지 않는 형식으로 되어 있다.
            case 416: return response.status(400).send(errorMsg); //416(처리할 수 없는 요청범위): 요청이 페이지에서 처리할 수 없는 범위에 해당되는 경우 서버는 이 상태 코드를 표시한다.
            case 417: return response.status(400).send(errorMsg); //417(예상 실패): 서버는 Expect 요청 헤더 입력란의 요구사항을 만족할 수 없다.
            default: return response.status(400).send(errorMsg);
        }
    },
    err_msg: (err) => {
        switch (err) {
            case 'user.changePassword.wrongPassword': return { status: 403, errorMsg: '비밀번호가 틀렸습니다' };
            case 'music.remove': return { status: 400, errorMsg: '삭제하지 못하였습니다' };
            default: return { status: 400, errMsg: '' };
        }
    },
};