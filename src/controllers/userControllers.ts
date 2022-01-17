/* userController.js */

export const join = (req: any, res: any) => res.send('회원가입 화면!')
export const login = (req: any, res: any) => res.send('로그인 화면!')
export const logout = (req: any, res: any) => {
  //TODO: 로그아웃 기능 구현
}
export const postJoin = (req: any, res: any) => {
  const {
    body: { userName, email, password, password2 },
  } = req
  if (password !== password2) {
    res.send({ message: 'notMatchPassword' })
  } else {
    res.send({ message: 'ok' })
  }
}
export const postLogin = (req: any, res: any) => {
  console.log('로그인 성공!')
}
