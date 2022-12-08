import * as jsonwebtoken from 'jsonwebtoken';

const generateToken = (id: string, email: string) => {
  return jsonwebtoken.sign(
    {
      id,
      email,
    },
    'very long json webtoken phrase(){}/',
    { expiresIn: '1y' }
  );
};

export default generateToken;
