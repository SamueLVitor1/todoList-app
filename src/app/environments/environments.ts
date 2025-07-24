interface EnvironmentInterface {
  production: boolean;
  hostURL: string;
}

export const environment: EnvironmentInterface = {
  production: false,
  hostURL: 'http://localhost:8080'
}