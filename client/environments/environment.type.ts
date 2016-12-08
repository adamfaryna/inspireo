export class Environment {
  constructor(
    public production: boolean,
    public apiHost: string,
    public protocol: string,
    public apiPort: string = ''){}
}
