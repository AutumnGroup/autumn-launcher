//
// All Event Names in an Enumeration
//


export type EventKeys = keyof typeof Event;

export enum Event
{
    TAB_SELECTED,

    CHAT_SHOW,
    CHAT_HIDE,

    MSG_SENT,
    MSG_RECEIVED,

    MODE_ONLINE,
    MODE_LOCAL,

    SERVER_READY,
    SERVER_CLOSED,
    SERVER_FAILED,

    REQUEST_LOGIN,
    REQUEST_REGISTER,
    REQUEST_OFFLINE,

    RESPONSE_LOGIN_OK,
    RESPONSE_LOGIN_ERROR,
    RESPONSE_REGISTRATION_OK,
    RESPONSE_REGISTRATION_ERROR,
}
