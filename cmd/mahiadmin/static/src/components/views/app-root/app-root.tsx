import {Component, h} from '@stencil/core';
import {randInt} from '../../../util';


@Component({
    tag: 'app-root',
    styleUrl: 'app-root.css',
    shadow: true
})
export class AppRoot {
    render() {
        return (
            <div>
                <main>
                    <stencil-router>
                        <stencil-route-switch scrollTopOffset={0}>
                            <AppRoute url={['', '/applications']} component='applications-view' exact={true}/>
                            <AppRoute url='/applications/:slug' component='application-details-view' exact={true}/>
                            <AppRoute url='/dashboard' component='dashboard-view' exact={true}/>

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
                return (
                    <ta-app-layout>
                        <ta-drawers routeId={randInt(1000)}/>
                        <Component {...props} {...props.componentProps}></Component>
                    </ta-app-layout>
                );
            }
        }/>
    );
}

