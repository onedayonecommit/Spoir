import { Cookies } from "react-cookie";

const cookies = new Cookies();
const expires = new Date
expires.setMinutes(expires.getMinutes + 30) // 만료시간 30분

/** 쿠키 세팅하는 함수 첫번째 파라미터 == 쿠키이름, 두번째 파라미터 == 쿠키에 저장할 값 , 세번째 파라미터 == 쿠키 옵션 */
export const setCookie = (name, value, option) => {
    return cookies.set(name, value, { ...option });
};
/** 쿠키의 값 가져오는 함수 첫번째 파라미터 == 값 가져올 쿠키 이름 */
export const getCookie = (name, option) => {
    return cookies.get(name, { ...option });
};
/** 쿠키 제거 하는 함수 첫번째 파라미터 == 제거할 쿠키 이름 */
export const removeCookie = (name, option) => {
    return cookies.remove(name, { ...option });
};