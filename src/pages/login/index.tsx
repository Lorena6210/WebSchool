// pages/login.tsx
import Login from "@/Views/Login";

interface Usuario {
  Id: number;
  Nome: string;
  RA?: string;
  Email?: string;
  Status: string;
  Senha?: string;
}

interface Dados {
  alunos: Usuario[];
  professores: Usuario[];
  responsaveis: Usuario[];
  gestores: Usuario[];
}

interface LoginPageProps {
  usuarios: Dados;
}

export default function LoginPage({ usuarios }: LoginPageProps) {
   return <Login usuariosProp={usuarios} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const cookies = req.cookies;
  const encrytedSession = cookies.user_session;

  if (encryptedSession) {
    try {
      // Descriptografia
      const CrytoJS = require('cryto-js');
      //Use variável de ambiente em produção
      const secretKey = process.env.COOKIE_SECRET || 'sua-chave-secreta'
      const bytes = CryptoJS.AES.descrypt(encryptedSession, secretKey);
      const sessionData = JSON.parse(bytes.toString(CryptoJS.enc.utf8));

      return {
        redirect: {
          destination: `/${sessionData.type}/${sessionData.id}`
        }
      };
    }catch (error) {

    }
    return {
      prop: {
        usuario: data.usuarios,
      }
    }
  }
}
  


// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const usuario = await jwtLoginStatus(ctx);

//   if (usuario) {
//     // Redireciona conforme o tipo
//     return {
//       redirect: {
//         destination: `/${usuario.Tipo}`,
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };