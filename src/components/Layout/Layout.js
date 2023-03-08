import { Layout as AntLayout, Menu, theme, Popover } from "antd";
import { useState } from "react";
import "./Layout.css";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import { useAuth } from "../../hooks/use-auth";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/slices/userSlice";
import { Outlet } from "react-router-dom";
import MenuOfTask from "../MenuOfTask/MenuOfTask";

const { Header, Content, Footer } = AntLayout;

const Layout = () => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const [isOpenModalLogin, setIsOpenModalLogin] = useState(false);
  const [isOpenModalSignUp, setIsOpenModalSignUp] = useState(false);

  const handleCancel = (e) => {
    setIsOpenModalLogin(false);
    setIsOpenModalSignUp(false);
  };

  const OnClick = (e) => {
    switch (e.key) {
      case "1":
        setIsOpenModalLogin(true);
        break;
      case "2":
        setIsOpenModalSignUp(true);
        break;
      case "3":
        dispatch(removeUser());
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menu = (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      items={
        !isAuth
          ? [
              { key: 1, label: "Вход" },
              { key: 2, label: "Регистрация" },
            ]
          : [{ key: 3, label: "Выход" }]
      }
      className="Layout-menu"
      onClick={OnClick}
    />
  );

  return (
    <>
      {!isAuth ? (
        <Login
          isOpenModal={isOpenModalLogin}
          handleCancel={handleCancel}
          setIsOpenModalLogin={setIsOpenModalLogin}
        />
      ) : null}
      {!isAuth ? (
        <SignUp
          isOpenModal={isOpenModalSignUp}
          handleCancel={handleCancel}
          setIsOpenModalSignUp={setIsOpenModalSignUp}
        />
      ) : null}
      <AntLayout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
          }}
        >
          <MenuOfTask />
          {!isAuth ? (
            <Popover
              content={
                "Регистрация позволит вам сохрянять файлы в облоко и синхронизировать заметки на всех устройствах"
              }
              title="Зарегестрируйтесь или войдите под существующей учетной записью"
              placement="topRight"
            >
              {menu}
            </Popover>
          ) : (
            menu
          )}
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div
            className="Layout-content"
            style={{
              padding: 24,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
          className="Layout-footer"
        >
          ©2023 Created by Alexander Morgunov
        </Footer>
      </AntLayout>
    </>
  );
};
export default Layout;
