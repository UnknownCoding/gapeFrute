import { atom } from "recoil";

export const channelState=atom({
    key:'channelState',
    default: {name:'',channelID:''},
})

export const channelId=atom({
    key:'channelId',
    default: "025gqVYnInjEhfTDWm6R",
})
