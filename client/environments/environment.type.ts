export class Environment {
  constructor(
    public production: boolean,
    public apiHost: string = 'localhost',
    public protocol: string = 'http://',
    public apiPort: string = ':3000'){}
}
