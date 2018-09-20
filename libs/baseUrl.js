const baseUrl = {
    get_code_url: '/api/v1/user/sms', //短信验证码
    send_vms_url: "/api/v1/user/send_vms",//语音
    register_url: "/api/v1/user/register", //注册
    is_phone_exits_url: "/api/v1/user/is_phone_exits", //验证手机号是否存在
    get_verity_type_url: "api/v1/user/get_verity_type", //验根据渠道名称获取 用户注册 使用验证码获取方式
}

export default baseUrl