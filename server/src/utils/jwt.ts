import jwt from 'jsonwebtoken';
import config from 'config';

export const signJwt = (
  payload: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions | undefined
) => {
  const secretOrPrivateKey = config.get<string>(keyName);

  return jwt.sign(payload, secretOrPrivateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export function verifyJwt<T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null {
  const publicKey = config.get<string>(keyName);

  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (e) {
    return null;
  }
}
