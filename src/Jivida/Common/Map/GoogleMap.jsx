import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, withProps, lifecycle } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

// Action
import * as ActionHouse from '../../Data/House/actions';

const JividaMapComponent = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyC11SByG3JTJoQYzOQ-dQ2vE5cx7OTBaWY&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '100%' }} />,
        mapElement: <div style={{ height: '100%' }} />,
        center: { lat: 37.532600, lng: 127.024612 },
    }),
    withScriptjs,
    withGoogleMap,
)((props) => {
    return (
        <GoogleMap
            ref={props.onRef}
            onCenterChanged={props.onCenterChanged}
            defaultZoom={13}
            defaultCenter={{ lat: 37.532600, lng: 127.024612 }}
            defaultOptions={{ maxZoom: 17 }}
        >
            <MarkerClusterer
                onClick={props.onMarkerClustererClick}
                averageCenter
                enableRetinaIcons
                gridSize={60}
                defaultMinimumClusterSize={1}
            >
                {props.markers.map(marker => (
                    <Marker
                        key={marker.id}
                        position={{ lat: marker.latitude, lng: marker.longitude }}
                    />
                ))}
            </MarkerClusterer>
        </GoogleMap>
    );
});

class JividaMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            houses: [],
            leftTop: {
                longitude: 0,
                latitude: 0,
            },
            rightBottom: {
                longitude: 0,
                latitude: 0,
            },
            updatedCount: 0,
        };
        this.getMarkers = this.getMarkers.bind(this);
        this.handleMarkerClustererClick = this.handleMarkerClustererClick.bind(this);
        this.handleHouseMouseOver = this.handleHouseMouseOver.bind(this);
        this.handleMapEvent = this.handleMapEvent.bind(this);
        this.handleCenterChanged = this.handleCenterChanged.bind(this);
    }
    componentDidMount() {
        this.props.onRef(this);
    }
    getMarkers(params) {
        if (this.state) {
            params.leftTop = this.state.leftTop;
            params.rightBottom = this.state.rightBottom;
        }
        ActionHouse.getSearchHousesForMap(params).then((houses) => {
            this.setState({ houses: houses });
        }).catch((err) => { });
    }
    reset(params) {
        this.getMarkers(params);
    }
    handleSelectAreaName(params) {
        let address = (params.si ? params.si : '') + (params.gu ? ' ' + params.gu : '') + (params.dong ? ' ' + params.dong : '');
        let geocoder = new window.google.maps.Geocoder();
        geocoder.geocode( {'address': address }, (results, status) => {
            if (status == 'OK') {
                this.setState({
                    position: results[0].geometry.viewport,
                })
/*                this.handleCenterChanged();*/
                let oldUpdatedCount = this.state.updatedCount + 1;
                this.setState({ updatedCount: oldUpdatedCount }, () => {
                    setTimeout(() => {
                        if (this.state.updatedCount == oldUpdatedCount) {
                            this.setState({
                                leftTop: {
                                    longitude: results[0].geometry.viewport.b.b,
                                    latitude: results[0].geometry.viewport.f.f,
                                },
                                rightBottom: {
                                    longitude: results[0].geometry.viewport.b.f,
                                    latitude: results[0].geometry.viewport.f.b,
                                },
                                updatedCount: 0,
                            }, () => {
                                this.props.onCenterChanged(this.state);

                                this.jividaMap.fitBounds(results[0].geometry.viewport);
                                this.jividaMap.panToBounds(results[0].geometry.viewport);
                            });
                        }
                    }, 200);
                });
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
    handleMarkerClustererClick(e) {

    }
    handleHouseMouseOver(position) { // 검색결과에서 마우스를 올렸을 때, 지도 상에 띄워주기

    }
    handleMapEvent(jividaMap) {
        setTimeout(() => {
            this.jividaMap = jividaMap;
            this.handleCenterChanged();
        }, 200);
    }
    handleCenterChanged() {
        let oldUpdatedCount = this.state.updatedCount + 1;
        this.setState({ updatedCount: oldUpdatedCount }, () => {
            setTimeout(() => {
                this.setState({
                    leftTop: {
                        longitude: this.jividaMap.getBounds().b.b,
                        latitude: this.jividaMap.getBounds().f.f,
                    },
                    rightBottom: {
                        longitude: this.jividaMap.getBounds().b.f,
                        latitude: this.jividaMap.getBounds().f.b,
                    },
                    updatedCount: 0,
                }, () => {
                    this.props.onCenterChanged(this.state);
                });
            }, 200);
        });
    }
    render() {
        return (
            <JividaMapComponent onRef={this.handleMapEvent} markers={this.state.houses} onMarkerClustererClick={this.handleMarkerClustererClick} onCenterChanged={this.handleCenterChanged} options={this.state.options} />
        );
    }
}
export default connect((state) => {    return {
        author: state.data.auth.author,
    };
})(withRouter(JividaMap));
