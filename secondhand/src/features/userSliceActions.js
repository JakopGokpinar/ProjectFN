import { instanceAxs } from "../config/api";
import { userActions } from "./userSlice";
import { uiSliceActions } from "./uiSlice";

export const fetchUser = () => {
    return async (dispatch) => {
        const handleRequest = async () => {
            instanceAxs.get('/fetchuser').then(response => {
                console.log(response)
                if(response.status === 200) {
                    dispatch(userActions.setUser(response.data.user))
                }
            }).catch(error => console.log(error))
        }
        await handleRequest();
    }
}

export const sendSignUpRequest = (user) => {
    return async (dispatch) => {
        const handleRequest = async () => {
            instanceAxs.post('/signup', user).then(response => {
                const responseMsg = response.data.message;
                if(responseMsg === 'user created') {
                    const user = response.data.user;
                    dispatch(userActions.login(user))
                }
            }).catch(error => {
                console.log(error)
            })
        }
        await handleRequest();
    }
}

export const sendLoginRequest = (user) => {
    return async (dispatch) => {

        const handleRequest = async () => {
            instanceAxs.post('/login', user).then(response => {

                const responseMsg = response.data.message;
                if(responseMsg === 'user logged in') {
                    const user = response.data.user;
                    dispatch(userActions.login(user));
                }

            }).catch(error => {
                console.log(error)
            })
        }
        await handleRequest();
    }
}

export const googleLoginRequest = (credentials) => {
    return async (dispatch) => {
        const handleRequest = async () => {
            instanceAxs.post('/google/auth', credentials).then(response => {

                const responseMsg = response.data.message;
                if(responseMsg === 'User logged in') {
                    const user = response.data.user;
                    dispatch(userActions.login(user))
                }

            }).catch(error => {
                console.log(error)
            })
        }
        await handleRequest();
    }
}

export const logoutRequest = () => {
    return async (dispatch) => {
        const handleRequest = async () => {
            instanceAxs.delete('/logout').then(response => {
                const responseMsg = response.data;
                if(responseMsg === 'user logged out') {
                    dispatch(userActions.logout())
                }
            }).catch(error => {
                console.log(error)
            })
        }
        await handleRequest();
    }
}

export const updateUser = (data) => {
    return async (dispatch) => {
        const handleRequest = async () => {
            if(data.formData !== null) {
                 
            const response = await instanceAxs.post('/profile/upload/picture', data.formData)
            const msg = response.data.message;
            if(msg === 'profile picture uploaded') {
                dispatch(userActions.setUser({}))
                dispatch(userActions.setUser(response.data.user));
                dispatch(uiSliceActions.setFeedbackBanner({severity: 'success', msg: msg}))
            } else {
                dispatch(uiSliceActions.setFeedbackBanner({severity: 'danger', msg: msg}))
            }        
        }
        setTimeout(async () => {
            const res = await instanceAxs.post('/profile/update/userinfo', data.userdata)
            const msg = res.data.message;
            if(msg === 'User updated') {
                const user = res.data.user;
                dispatch(userActions.setUser(user));
                dispatch(uiSliceActions.setFeedbackBanner({severity: 'success', msg: msg}))
            }
        }, 1000)
        }
        await handleRequest();
    }
}

export const removeProfilePicture = () => {
    return async (dispatch) => {
        const handleRequest = async () => {
            instanceAxs.post('/profile/delete/picture').then(response => {
                const msg = response.data.message;
                if(msg === 'User updated') {
                    const user = response.data.user;
                    dispatch(userActions.setUser(user));
                    dispatch(uiSliceActions.setFeedbackBanner({severity: 'success', msg: msg}))
                }
                dispatch(uiSliceActions.setFeedbackBanner({severity: 'info', msg: msg}))
            })
        }
        await handleRequest();
    }
}

export const addToFavorites = (annonceId) => {
    return async (dispatch) => {
        const handleRequest = async () => {
            instanceAxs.post('/favorites/add', {id: annonceId}).then(response => {
                const msg = response.data.message;
                if(msg === 'Annonce saved to Favorites') {
                    const user = response.data.user;
                    dispatch(userActions.setUser(user));
                    dispatch(uiSliceActions.setFeedbackBanner({severity: 'success', msg: msg}))
                    return;
                }
                dispatch(uiSliceActions.setFeedbackBanner({severity: 'error', msg: msg}))
            })
        }
        await handleRequest();
    }
}

export const removeFromFavorites = (annonceId) => {
    return async (dispatch) => {
        const handleRequest = async () => {
            instanceAxs.post('/favorites/remove', {id: annonceId}).then(response => {
                const msg = response.data.message;
                if(msg === 'Annonce removed from favorites') {
                    const user = response.data.user;
                    dispatch(userActions.setUser(user));
                    dispatch(uiSliceActions.setFeedbackBanner({severity: 'info', msg: msg}))
                    return;
                }
                dispatch(uiSliceActions.setFeedbackBanner({severity: 'danger', msg: msg}))
            })
        }
        await handleRequest();
    }
}

export const fetchFavorites = () => {
    return async (dispatch) => {
        const handleRequest = async () => {
            instanceAxs.get('/favorites/get').then(response => {
                const msg = response.data.message;
                const productArray = response.data.productArray;
                if(productArray) {
                    dispatch(userActions.setUserFavorites(productArray))
                    return;
                }
                dispatch(uiSliceActions.setFeedbackBanner({severity: 'danger', msg: msg}))
            })
        }
        await handleRequest();
    }
}

export const removeAnnonce = (annonceId) => {
    return async (dispatch) => {
        const handleRequest = async () => {
            instanceAxs.post('/newannonce/delete', {annonceid: annonceId}).then(response => {
                if(response.status === 200) {
                    dispatch(uiSliceActions.setFeedbackBanner({severity: 'success', msg: response.data.message}))
                } else {
                    dispatch(uiSliceActions.setFeedbackBanner({severity: 'danger', msg: 'Error occured while deleting object'}))
                }
            })
        }
        await handleRequest();
    }
}
