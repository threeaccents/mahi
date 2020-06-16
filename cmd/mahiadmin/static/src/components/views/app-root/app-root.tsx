import {Component, h} from '@stencil/core';
import AuthService from '../../../api/auth';
import {debounce, me, randInt} from '../../../util';
import toastr from '../../../libs/toastr';
import BillingService from '../../../api/billing';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {

  componentDidLoad() {
    if (!me()) return

    this.refreshAuthData()

    if (!me().isAdmin) return

    this.refreshInvoiceData()
  }

  private refreshAuthData() {
    AuthService()
      .updateLocalStorage()
  }

  private refreshInvoiceData() {
    BillingService()
      .setBilling()
  }

  render() {
    return (
      <div>
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <GuestRoute url={['/', '/auth']} component='auth-view' exact={true}/>
              <GuestRoute url={"/forgot-password"} component='forgot-password-view' exact={true}/>
              <GuestRoute url={"/reset-password"} component='reset-password-view' exact={true}/>

              <AdminRoute url='/users' component='users-view' exact={true}/>
              <AppRoute url='/applications/:slug' component='application-details-view' exact={true}/>
              <AppRoute url='/applications' component='applications-view' exact={true}/>
              <AdminRoute url='/dashboard' component='dashboard-view' exact={true}/>
              <AppRoute url="/settings" component="settings-view" exact/>

            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}

const AppRoute = ({component, ...props}: { [key: string]: any }) => {
  const Component = component;

  return (
    <stencil-route {...props} routeRender={
      (props: { [key: string]: any }) => {
        if (AuthService().isAuthenticated()) {
          return (
            <ta-app-layout>
              <ta-drawers routeId={randInt(1000)}/>
              <Component {...props} {...props.componentProps}></Component>
            </ta-app-layout>
          );
        }
        return <stencil-router-redirect url="/auth"></stencil-router-redirect>
      }
    }/>
  );
}

const AdminRoute = ({component, ...props}: { [key: string]: any }) => {
  const Component = component;

  const warningMessage = debounce(() => {
    toastr().warning(`You do not have permission to view "${props.url}" page.`)
  }, 300)

  return (
    <stencil-route {...props} routeRender={
      (props: { [key: string]: any }) => {
        if (AuthService().isAuthenticated() && me().isAdmin) {
          return (
            <ta-app-layout>
              <ta-drawers routeId={randInt(1000)}/>
              <Component {...props} {...props.componentProps}></Component>
            </ta-app-layout>
          );
        }
        warningMessage()
        return <stencil-router-redirect url="/applications"></stencil-router-redirect>
      }
    }/>
  );
}

const GuestRoute = ({component, ...props}: { [key: string]: any }) => {
  const Component = component;

  return (
    <stencil-route {...props} routeRender={
      (props: { [key: string]: any }) => {
        if (!AuthService().isAuthenticated()) {
          return <Component {...props} {...props.componentProps}></Component>;
        }
        return <stencil-router-redirect url={me().isAdmin ? '/dashboard' : '/applications'}></stencil-router-redirect>
      }
    }/>
  );
}
