import React, { useEffect, useState } from 'react';

//UI
import { Layout } from 'ui/organisms/Layout/Layout';
import { Menu } from 'ui/molecules/Menu/Menu';
import { Input } from 'ui/atoms/Input/Input';
import { Button } from 'ui/atoms/Button/Button';

import { useProfileMenu } from 'hooks/useProfileMenu';
import { profile } from 'libs/http/Profile/profile';

import './ProfilePage.scss';

export const ProfilePage = (): React.ReactElement => {
  const [pageValue, setPageValue] = useState('change-email');
  const menu = useProfileMenu();
  const [isSending, setIsSending] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailChanged, setEmailChanged] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await profile.getUser();
      setUserEmail(data.email);
    };

    try {
      fetchData();
    } catch (e: any) {
      setUserEmail(e.message);
    }
  }, [emailChanged]);

  const onChangePassword = async () => {
    try {
      if (isSending) return;
      setIsSending(true);

      await profile.changePassword({
        oldPassword,
        password,
        passwordConfirm,
      });

      setIsSending(false);
      setPasswordError('');
    } catch (e: any) {
      setIsSending(false);
      setPasswordError(e.response.data);
    }
  };

  const onChangeEmail = async () => {
    try {
      if (isSending) return;
      setIsSending(true);

      await profile.changeEmail({
        email,
      });

      setEmailChanged(!emailChanged);
      setIsSending(false);
      setEmailError('');
    } catch (e: any) {
      setIsSending(false);
      setEmailError(e.response.data);
    }
  };

  return (
    <Layout>
      <div className="change-email-page">
        <div className="change-email-page__menu">
          <Menu menu={menu} pageValue={pageValue} onChange={setPageValue} />
        </div>
        {pageValue == 'change-email' ? (
          <div className="change-email">
            <div className="change-email__title">Schimb?? adresa de email</div>
            <div className="change-email__description">
              <p>
                Pe aceasta pagin?? pute??i s?? v?? schimba??i adresa de email din
                contul USI Web. Ve??i putea utiliza noua adres?? de email ??n cazul
                ??n care dori??i s?? v?? reseta??i parola ??n aplica??ia USI Web.
              </p>
              <div className="change-email__description__form">
                <p>
                  Adresa de email curent??: <span>{userEmail}</span>
                </p>
                <p>
                  Introduce??i adresa nou?? de email:{' '}
                  <Input onChange={setEmail} className="change-email__input" />
                </p>
                {emailError ? (
                  <span className="change-password__error">{emailError}</span>
                ) : null}
                <Button
                  text="Schimb??"
                  className="change-email__button"
                  disabled={isSending}
                  onClick={() => onChangeEmail()}
                />
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        {pageValue == 'change-password' ? (
          <div className="change-password">
            <div className="change-password__title">Schimb?? Parola</div>
            <div className="change-password__description">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <p>Parol?? veche:</p>
                    </td>
                    <td>
                      <Input
                        type="password"
                        className="change-password__input"
                        onChange={setOldPassword}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Parol?? nou?? (max. 12 caractere):</p>
                    </td>
                    <td>
                      <Input
                        type="password"
                        className="change-password__input"
                        onChange={setPassword}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Confirmare parol?? nou?? (max. 12 caractere):</p>
                    </td>
                    <td>
                      <Input
                        type="password"
                        className="change-password__input"
                        onChange={setPasswordConfirm}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <p></p>
              {passwordError ? (
                <span className="change-password__error">{passwordError}</span>
              ) : null}
              <Button
                className="change-password__button"
                text="Confirm??"
                disabled={isSending}
                onClick={() => onChangePassword()}
              />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </Layout>
  );
};
