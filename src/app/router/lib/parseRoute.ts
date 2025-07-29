import { type Route, routeConfig } from '../constants/constants.ts';

interface PathToRegReturn {
  regex: RegExp;
  namesParams: string[];
}

const convertPathToReg = (path: string): PathToRegReturn => {
  const groupsReg = '([^/]+)';
  const namesParams: string[] = [];

  const regexPattern = path.replace(/:([\w-]+)/g, (_match, paramName) => {
    namesParams.push(paramName);
    return groupsReg;
  });

  const regex = new RegExp(`^${regexPattern}$`);
  return { regex, namesParams };
};

const getParams = (path: string, route: Route) => {
  const { regex, namesParams } = convertPathToReg(route.path);
  const regMatchArr = path.match(regex);

  if (!regMatchArr) return null;

  const params: Record<string, string> = {};

  namesParams.forEach((name, index) => {
    params[name] = regMatchArr[index + 1];
  });

  return params;
};

export const getRouteByPath = (path: string) => {
  const normalizePath = path.startsWith('/') ? path : `/${path}`;
  const routeConfigValues = (Object.values(routeConfig) as Route[]).filter(
    (route) => route.public
  );

  const route = routeConfigValues.find((route) =>
    normalizePath.match(convertPathToReg(route.path)?.regex)
  );

  if (!route) return null;

  const params = getParams(normalizePath, route);
  return { route, params, path };
};
