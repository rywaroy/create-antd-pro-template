import { Button } from 'antd';

import styles from './index.less';

export default function Menu(props) {
  const { routes, parentRoute, selectRoute, addRoute } = props;

  const onSelectRoute = (route) => {
    if (!route.routes) {
      selectRoute(route);
    }
  };

  return (
    <div>
      {routes.map((route) => (
        <div key={route.id} className={styles.menuGroup}>
          <div className={styles.menuItem} onClick={() => onSelectRoute(route)}>
            {route.name}
          </div>
          {route.routes && (
            <Menu
              routes={route.routes}
              parentRoute={route}
              selectRoute={onSelectRoute}
              addRoute={addRoute}
            />
          )}
        </div>
      ))}
      <div className={styles.add}>
        <Button
          type="dashed"
          block
          onClick={() => {
            addRoute(parentRoute);
          }}
        >
          添加{parentRoute ? parentRoute.name : ''}子路由
        </Button>
      </div>
    </div>
  );
}
