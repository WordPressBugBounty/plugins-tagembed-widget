/*--Start--Create Feed According Filters*/
var __tagembed__feed_filters = document.querySelector("#__tagembed__feed_filters");
if (__tagembed__feed_filters) {
    __tagembed__feed_filters.addEventListener("change", function (event) {
	let __tagembed__toast = new TagembedToast;
	/*Manage Widget Error*/
	let widgetData = document.querySelector("#__tagembed__widgets").selectedOptions[0];
	let widgetId = widgetData.value.split('#')[0];
	let widgetName = widgetData.value.split('#')[1];
	let networkData = document.querySelector("#__tagembed__networks").selectedOptions[0].value;
	let networkId = networkData.split('#')[0];
	let networkName = networkData.split('#')[1];
	let filterId = event.target.value.split('#')[0];
	let filterName = event.target.value.split('#')[1];
	if (!networkId || !networkName || !widgetId || !widgetName || !filterName || !filterId) {
	    __tagembed__feed_filters.selectedIndex = 0;
	    return;
	}
	let __tagembed__feed_data = {'widgetId': widgetId, 'widgetName': widgetName, 'networkId': networkId, 'networkName': networkName, 'filterId': filterId, 'filterName': filterName};
	__tagembed__feed_data.inputs = [];
	switch (__tagembed__feed_data.networkId) {
	    case "1":
		__tagembed__createTwitterFeed(__tagembed__feed_data);
		break;
	    case "2":/*Note : This Use For Merge Instagram 2/18*/
	    case "18":
		networkId = __tagembed__feed_data.filterId == 1 || __tagembed__feed_data.filterId == 73 ? 2 : 18;
		__tagembed__get_already_exist_auth_new(networkId, __tagembed__feed_data);
		break;
	    case "3":
		__tagembed__createFacebookFeed(__tagembed__feed_data);
		break;
	    case "4":
		__tagembed__createGoogleFeed(__tagembed__feed_data);
		break;
	    case "5":
		__tagembed__createPinterestFeed(__tagembed__feed_data);
		break;
	    case"6":
		__tagembed__createFlickrFeed(__tagembed__feed_data);
		break;
	    case"7":
		__tagembed__createYoutubeFeed(__tagembed__feed_data);
		break;
	    case"8":
		__tagembed__createVimeoFeed(__tagembed__feed_data);
		break;
	    case"10":
		__tagembed__createLinkdinFeed(__tagembed__feed_data);
		break;
	    case"11":
		__tagembed__createTumblrFeed(__tagembed__feed_data);
		break;
	    case"12":
		__tagembed__createRssFeed(__tagembed__feed_data);
		break;
	    case"19":
		__tagembed__createYelpFeed(__tagembed__feed_data);
		break;
	    case"20":
		__tagembed__createSlackFeed(__tagembed__feed_data);
		break;
	    case"23":
		__tagembed__createAirbnbFeed(__tagembed__feed_data);
		break;
//	    case"28":
//		__tagembed__createCapeterraFeed(__tagembed__feed_data);
//		break;
	    case"36":
		__tagembed__createEtsyFeed(__tagembed__feed_data);
		break;
	    case"28":
		__tagembed__createTiktokFeed(__tagembed__feed_data);
		break;
	    case"32":
		__tagembed__createVkFeed(__tagembed__feed_data);
		break;
	    case"33":
		__tagembed__createTrustpilotFeed(__tagembed__feed_data);
		break;
	    case"34":
		__tagembed__createAmazonFeed(__tagembed__feed_data);
		break;
	    case"35":
		__tagembed__createTripadvisorFeed(__tagembed__feed_data);
		break;
	    case"37":
		__tagembed__createAliexpressFeed(__tagembed__feed_data);
		break;
	    default:
		__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
		document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
		return;
		break;
	}
    });
}
/*--End--Create Feed According Filters*/
/*--Start--Create Twitter Feed*/
function __tagembed__createTwitterFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    let __tagembed__common_inputs = [{label: 'Add Multiple Photos', type: 'checkbox', name: 'multiplePhoto'}, {label: 'Exclude Retweets', type: 'checkbox', name: 'excludeRetweet'}];
    /*Already Exist Accounts*/
    let __tagembed__exist_auth = __tagembed__alreadyExistAuth();
    switch (__tagembed__feed_data.filterId) {
	case "1":
	    __tagembed__feed_data.inputs = [{label: 'User Handle', type: 'text', name: 'feed', placeholder: 'Enter User handle'}].concat(__tagembed__common_inputs);
	    break;
	case "2":
	    __tagembed__feed_data.inputs = [{label: 'HashTag', type: 'text', name: 'feed', placeholder: 'Enter HashTag'}].concat(__tagembed__common_inputs);
	    break;
	case "3":
	    __tagembed__feed_data.inputs = [{label: 'User Name', type: 'text', name: 'feed', placeholder: 'Enter User Name'}, {label: 'List Id', type: 'text', name: 'list', placeholder: 'Enter List Id'}].concat(__tagembed__common_inputs);
	    break;
	case "4":
	    __tagembed__feed_data.inputs = [{label: 'The Twitter Handle Of The User To Import Favorites From', type: 'text', name: 'feed', placeholder: 'Enter The Twitter Handle Of The User To Import Favorites From'}].concat(__tagembed__common_inputs);
	    break;
	case "5":
	    __tagembed__feed_data.inputs = [{label: 'Query', type: 'text', name: 'feed', placeholder: 'to:tagembed'}].concat(__tagembed__common_inputs);
	    break;
	case "7":
	    __tagembed__feed_data.inputs = [{label: 'User Mention', type: 'text', name: 'feed', placeholder: 'Enter User Mention'}].concat(__tagembed__common_inputs);
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    if (__tagembed__exist_auth.alreadyAuthOption.length > 0)
	__tagembed__feed_data.inputs = __tagembed__exist_auth.alreadyAuthOption.concat(__tagembed__feed_data.inputs);
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Twitter Feed*/
/*--Start--Create Instagram Feed*/
function __tagembed__createInstagramFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    /*Already Exist Accounts*/
    let __tagembed__exist_auth = __tagembed__alreadyExistAuth();
    if (__tagembed__exist_auth.alreadyAuthOption.length > 0)
	__tagembed__feed_data.inputs = __tagembed__exist_auth.alreadyAuthOption.concat(__tagembed__feed_data.inputs);
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Instagram Feed*/
/*--Start--Create Facebook Feed*/
function __tagembed__createFacebookFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    /*Already Exist Accounts*/
    let setOnlyParentNetwork = (__tagembed__feed_data.filterId == 1 || __tagembed__feed_data.filterId == 8) ? true : false;/*Manage Connected Account On Facebook Handel Time */
    let __tagembed__exist_auth = __tagembed__alreadyExistAuth(setOnlyParentNetwork);
    switch (__tagembed__feed_data.filterId) {
	case "1":
	    break;
	case "8":
	    __tagembed__feed_data.inputs = [{label: 'Facebook Page', type: 'text', name: 'facebookPage', placeholder: 'Enter Page URL Or Page Name', id: '__tagembed__facebook_search_page', jsFunction: 'onkeyup="__tagembed__manageFacebookPageSearchOptions();"', extraTag: 'search_option', inputLoader: 'facebook_page_search_loader'}, {id: '__tagembed__facebook_feed', type: 'hidden', name: 'feed'}];
	    break;
	case "55":
	    break;
	case "62":
	    break;
	case "65":
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    if (__tagembed__exist_auth.alreadyAuthOption.length > 0) {
	switch (__tagembed__feed_data.filterId) {
	    case "65":
		let options = [{name: 'All Facebook Page Album', value: '67'}, {name: 'Single Album', value: '65'}];
		__tagembed__feed_data.inputs = [{label: 'Select Album Type', type: 'select', name: 'accountAlbumType', id: '__tagembed__account_album_type', jsFunction: 'onChange="__tagembed__getFacebookPageAlbums();"', options: options, extraTag: 'account_album_section', tagembedformwrowId: '__tagembed__facebook_album_section'}];
		break;
	}
	__tagembed__feed_data.inputs = __tagembed__exist_auth.alreadyAuthOption.concat(__tagembed__feed_data.inputs);
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--Start--Get Facebook Page Album*/
function __tagembed__getFacebookPageAlbums() {
    let __tagembed__connected_accountsId = document.querySelector("#__tagembed__connected_accounts").selectedOptions[0].value;
    let __tagembed__account_album_type = document.querySelector("#__tagembed__account_album_type").selectedOptions[0].value;
    let __tagembed__account_album_section = document.querySelector("#__tagembed__account_album_section");
    if (__tagembed__account_album_type == 65) {
	__tagembed__open_loader();
	let __tagembed__toast = new TagembedToast;
	let formData = new FormData();
	formData.append('action', 'data');
	formData.append('connectedAccountsId', __tagembed__connected_accountsId);
	formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	formData.append('__tagembed__ajax_action', '__tagembed__get_facebook_page_albums');
	fetch(__tagembed__ajax_url, {
	    method: 'POST',
	    headers: {
		'x-requested-with': 'XMLHttpRequest',
	    },
	    body: formData,
	}).then(response => {
	    return response.json()
	}).then(response => {
	    __tagembed__close_loader();
	    if (response.status == true) {
		let elemHTML = `<label>Select Album</label><select name="accountAlbumData" id="__tagembed__account_album_data">`;
		if (response.data) {
		    for (let index in response.data)
			elemHTML = `${elemHTML} <option value="${response.data[index].id}#${response.data[index].name}">${response.data[index].name}</option>`;
		} else {
		    elemHTML = `${elemHTML} <option value="">This Facebook Pase Album Not Found</option>`;
		}
		elemHTML = `${elemHTML} </select>`;
		__tagembed__account_album_section.style.display = 'block';
		__tagembed__account_album_section.innerHTML = elemHTML;
	    } else {
		__tagembed__account_album_section.innerHTML = '';
		__tagembed__account_album_section.style.display = 'none';
		__tagembed__close_loader();
		if (response.hasOwnProperty("message")) {
		    __tagembed__toast.danger({message: response.message, position: '__tagembed__is-top-right'});
		} else {
		    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
		}
	    }
	}).catch((error) => {
	    console.log(error);
	    __tagembed__close_loader();
	    __tagembed__account_album_section.innerHTML = '';
	    __tagembed__account_album_section.style.display = 'none';
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	});
    } else {
	__tagembed__account_album_section.innerHTML = '';
	__tagembed__account_album_section.style.display = 'none';
    }

}
/*--End--Get Facebook Page Album*/
/*--Start-- Search Facebook And Manage Facebook Page Data*/
function __tagembed__manageFacebookPageSearchOptions() {
    let __tagembed__facebook_search_page = document.getElementById('__tagembed__facebook_search_page').value;
    let __tagembed__feed_error = document.getElementById('__tagembed__facebookPage_error');
    if (__tagembed__facebook_search_page.length > 2) {
	__tagembed__feed_error.textContent = "";
	if (__tagembed__facebook_search_page.includes('facebook.com/')) {
	    try {
		if (!__tagembed__facebook_search_page.startsWith('http://') && !__tagembed__facebook_search_page.startsWith('https://')) {
		    __tagembed__facebook_search_page = 'https://' + __tagembed__facebook_search_page;
		}

		let url = new URL(__tagembed__facebook_search_page);
		if (url.hostname.includes('facebook.com')) {
		    let pathAfterFacebook = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;
		    if (pathAfterFacebook) {
			__tagembed__facebookSearchData('', __tagembed__facebook_search_page, __tagembed__facebook_search_page);
			return false;
		    } else {
			__tagembed__feed_error.innerHTML = "No specific path found after 'facebook.com'";
		    }
		} else {
		    __tagembed__feed_error.innerHTML = "The URL does not belong to 'facebook.com'";
		}
	    } catch (error) {
		__tagembed__feed_error.innerHTML = "Invalid URL";
	    }
	} else {
	    let __tagembed__toast = new TagembedToast;
	    __tagembed__facebook_page_search_loader = document.getElementById('__tagembed__facebook_page_search_loader');
	    __tagembed__facebook_page_search_loader.style.display = 'block';
	    let __tagembed__search_option = document.querySelector("#__tagembed__search_option");
	    __tagembed__search_option.style.display = "none";
	    __tagembed__search_option.innerHTML = "";

	    let formData = new FormData();
	    formData.append('action', 'data');
	    formData.append('facebookPageData', __tagembed__facebook_search_page);
	    formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	    formData.append('__tagembed__ajax_action', '__tagembed__search_facebook_page');
	    fetch(__tagembed__ajax_url, {method: 'POST', headers: {'x-requested-with': 'XMLHttpRequest'}, body: formData,
	    }).then(response => {
		return response.json();
	    }).then(response => {
		if (response.status == true) {
		    __tagembed__search_option.style.display = 'block';
		    let elemHTML = `<ul>`;
		    if (response.data.length > 0) {
			for (let index in response.data)
			    elemHTML = `${elemHTML} <li style="font-weight:500; line-height:normal;" onClick="__tagembed__facebookSearchData('${response.data[index].name}','${response.data[index].link}')" value="${response.data[index].link}">${response.data[index].name} <span style="display:block; line-height:normal; font-weight:normal; margin-top:3px;">${response.data[index].link}</span></li>`;
		    } else {
			elemHTML = `${elemHTML} <li value="">Not Found</li>`;
		    }
		    elemHTML = `${elemHTML} </ul>`;
		    __tagembed__search_option.innerHTML = elemHTML;
		    __tagembed__facebook_page_search_loader.style.display = 'none';
		} else {
		    __tagembed__search_option.innerHTML = "";
		    __tagembed__facebook_page_search_loader.style.display = 'none';
		    if (response.hasOwnProperty("message")) {
			__tagembed__toast.danger({message: response.message, position: '__tagembed__is-top-right'});
		    } else {
			__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
		    }
		}
	    }).catch((error) => {
		__tagembed__search_option.innerHTML = "";
		__tagembed__facebook_page_search_loader.style.display = 'none';
		__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    });
	}
    } else {
	__tagembed__search_option.style.display = "none";
	__tagembed__feed_error.innerHTML = "Enter Minimum 3 Characters";
	__tagembed__feed_error.style.display = 'block';
	__tagembed__search_option.innerHTML = "";
	__tagembed__facebook_page_search_loader.style.display = 'none';
    }
}
function __tagembed__facebookSearchData(__tagembed__page_name, __Tagembed__page_link) {
    document.getElementById("__tagembed__facebook_search_page").value = __tagembed__page_name;
    document.getElementById("__tagembed__facebook_feed").value = __Tagembed__page_link;
    document.getElementById("__tagembed__search_option").style.display = 'none';
}
/*--End-- Search Facebook And Manage Facebook Page Data*/
/*--End--Create Facebook Feed*/
/*--Start--Create Google Feed*/
function __tagembed__createGoogleFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    switch (__tagembed__feed_data.filterId) {
	case "29":
	    /*Already Exist Accounts*/
	    let __tagembed__exist_auth = __tagembed__alreadyExistAuth();
	    if (__tagembed__exist_auth.alreadyAuthOption.length > 0)
		__tagembed__feed_data.inputs = __tagembed__exist_auth.alreadyAuthOption.concat(__tagembed__feed_data.inputs);
	    break;
	case "33":
	    __tagembed__feed_data.inputs = [{label: 'Search', id: '__tagembed__google_location', jsFunction: 'onkeyup="__tagembed__searchGoogleLocation();"', type: 'text', name: 'feed', placeholder: 'Webster, NY, USA', extraTag: 'search_option', inputLoader: 'google_location_search_loader'}, {id: '__tagembed__place_id', type: 'hidden', name: 'placeId'}, {id: '__tagembed__place_name', type: 'hidden', name: 'placeName'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--Start-- Search Google Location And Find Place Id*/
function __tagembed__searchGoogleLocation() {
    let __tagembed__google_location = document.querySelector("#__tagembed__google_location").value;
    let __tagembed__search_option = document.querySelector("#__tagembed__search_option");
    let __tagembed__google_location_search_loader = document.querySelector("#__tagembed__google_location_search_loader");
    if (__tagembed__google_location && __tagembed__google_location.length > 3) {
	__tagembed__google_location_search_loader.style.display = 'block';
	/*__tagembed__search_option.innerHTML = '';*/
	let __tagembed__toast = new TagembedToast;
	let formData = new FormData();
	formData.append('action', 'data');
	formData.append('googleLocationName', __tagembed__google_location);
	formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	formData.append('__tagembed__ajax_action', '__tagembed__search_google_location');
	fetch(__tagembed__ajax_url, {
	    method: 'POST',
	    headers: {
		'x-requested-with': 'XMLHttpRequest',
	    },
	    body: formData,
	}).then(response => {
	    return response.json()
	}).then(response => {
	    if (response.status == true) {
		let elemHTML = `<ul>`;
		if (response.data) {
		    for (let index in response.data)
			elemHTML = `${elemHTML} <li onClick="__tagembed__manageGoogleSearchData('${response.data[index].place_id}','${response.data[index].structured_formatting.main_text}','${response.data[index].description}')" value="${response.data[index].place_id}"> <img src="${__tagembed__plugin_url_for_js}assets/images/feeds/location.svg" alt="image" />${response.data[index].description}</li>`;
		} else {
		    elemHTML = `${elemHTML} <li value="">Not Found</li>`;
		}
		elemHTML = `${elemHTML} </ul>`;
		__tagembed__search_option.innerHTML = elemHTML;
		__tagembed__google_location_search_loader.style.display = 'none';
	    } else {
		__tagembed__search_option.innerHTML = '';
		__tagembed__google_location_search_loader.style.display = 'none';
		if (response.hasOwnProperty("message")) {
		    __tagembed__toast.danger({message: response.message, position: '__tagembed__is-top-right'});
		} else {
		    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
		}
	    }
	}).catch((error) => {
	    console.log(error);
	    __tagembed__close_loader();
	    __tagembed__search_option.innerHTML = '';
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    __tagembed__google_location_search_loader.style.display = 'none';
	});
    } else {
	__tagembed__search_option.innerHTML = '';
	__tagembed__google_location_search_loader.style.display = 'none';
    }
}
function __tagembed__manageGoogleSearchData(__tagembed__place_id, __tagembed__place_name, __tagembed__place_description) {
    let __tagembed__toast = new TagembedToast;
    if (!__tagembed__place_id || !__tagembed__place_name || !__tagembed__place_description)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    document.querySelector("#__tagembed__google_location").value = __tagembed__place_description;
    document.querySelector("#__tagembed__place_id").value = __tagembed__place_id;
    document.querySelector("#__tagembed__place_name").value = __tagembed__place_name;
    document.querySelector("#__tagembed__search_option").innerHTML = '';
}
/*--End-- Search Google Location And Find Place Id*/
/*--End--Create Google Feed*/
/*--Start--Create Pintrest Feed*/
function __tagembed__createPinterestFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    switch (__tagembed__feed_data.filterId) {
	case "1":
	    __tagembed__feed_data.inputs = [{label: 'User Handel', type: 'text', name: 'feed', placeholder: 'Enter User Handle'}];
	    break;
	case "12":
	    __tagembed__feed_data.inputs = [{label: 'Board Url', type: 'text', name: 'feed', placeholder: 'Enter Board Url : https://in.pinterest.com/tagembed/tagembed-social-blog/'}];
	    break;
	case "71":
	    __tagembed__feed_data.inputs = [{label: 'User Handel', type: 'text', name: 'feed', placeholder: 'Enter User Handle'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Pintrest Feed*/
/*--Start--Create Flickr Feed*/
function __tagembed__createFlickrFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    switch (__tagembed__feed_data.filterId) {
	case "1":
	    __tagembed__feed_data.inputs = [{label: 'Handel', type: 'text', name: 'feed', placeholder: 'Enter User Handle'}];
	    break;
	case "2":
	    __tagembed__feed_data.inputs = [{label: 'Hashtag', type: 'text', name: 'feed', placeholder: 'Enter Hashtag'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Flickr Feed*/
/*--Start--Create Youtube Feed*/
function __tagembed__createYoutubeFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    switch (__tagembed__feed_data.filterId) {
	case "1":
	    __tagembed__feed_data.inputs = [{label: 'Channel', id: '__tagembed__youtube_channel_data', searchBtn: 'youtube', jsFunction: 'onkeyup="__tagembed__manageYoutubeSearchOptions();"', jsSearchBtnFunction: 'onclick="__tagembed__youtubeChannelSearch();"', type: 'text', name: 'feed', placeholder: 'Enter Channel URL OR Search By Channel Name', extraTag: 'search_option', inputLoader: 'youtube_channel_search_loader'}, {id: '__tagembed__youtube_id', type: 'hidden', name: 'youtubeId'}, {id: '__tagembed__youtube_name', type: 'hidden', name: 'youtubeName'}];
	    break;
	case "11":
	    __tagembed__feed_data.inputs = [{label: 'Channel', id: '__tagembed__youtube_channel_data', searchBtn: 'youtube', jsFunction: 'onkeyup="__tagembed__manageYoutubeSearchOptions();"', jsSearchBtnFunction: 'onclick="__tagembed__youtubeChannelPlaylistSearch();"', type: 'text', name: 'feed', placeholder: 'Enter Channel URL OR Search By Channel Name', extraTag: 'search_option', inputLoader: 'youtube_channel_search_loader'}, {id: '__tagembed__youtube_id', type: 'hidden', name: 'youtubeId'}, {id: '__tagembed__youtube_name', type: 'hidden', name: 'youtubeName'}];
	    break;
	case "4":
	    __tagembed__feed_data.inputs = [{label: 'Keyword', type: 'text', name: 'feed', placeholder: 'Enter Keyword'}];
	    break;
	case "75":
	    __tagembed__feed_data.inputs = [{label: 'Channel', id: '__tagembed__youtube_channel_data', searchBtn: 'youtube', jsFunction: 'onkeyup="__tagembed__manageYoutubeSearchOptions();"', jsSearchBtnFunction: 'onclick="__tagembed__youtubeChannelSearch();"', type: 'text', name: 'feed', placeholder: 'Enter Channel URL OR Search By Channel Name', extraTag: 'search_option', inputLoader: 'youtube_channel_search_loader'}, {id: '__tagembed__youtube_id', type: 'hidden', name: 'youtubeId'}, {id: '__tagembed__youtube_name', type: 'hidden', name: 'youtubeName'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--Start-- Manage Youtube Search Options*/
function __tagembed__manageYoutubeSearchOptions() {
    let __tagembed__search_option = document.querySelector("#__tagembed__search_option");
    if (__tagembed__search_option) {
	__tagembed__search_option.innerHTML = "";
	__tagembed__search_option.style.display = 'none';
    }
    let __tagembed__feed_error = document.querySelector("#__tagembed__feed_error");
    if (__tagembed__feed_error) {
	__tagembed__feed_error.innerHTML = "";
	__tagembed__feed_error.style.display = 'none';
    }
    document.querySelector("#__tagembed__youtube_id").value = "";
    document.querySelector("#__tagembed__youtube_name").value = "";
}
/*--End-- Manage Youtube Search Options*/
/*--Start-- Search Youtube Data */
function __tagembed__youtubeChannelSearch() {
    __tagembed__youtubeSearch("channel");
}
function __tagembed__youtubeChannelPlaylistSearch() {
    __tagembed__youtubeSearch("playlist");
}
function __tagembed__youtubeSearch(type = null) {
    /*--Start--Manage Hidden Fields*/
    document.querySelector("#__tagembed__youtube_id").value = "";
    document.querySelector("#__tagembed__youtube_name").value = "";
    let __tagembed__feed_error = document.querySelector("#__tagembed__feed_error");
    if (__tagembed__feed_error)
	__tagembed__feed_error.style.display = 'none';
    let __tagembed__search_option = document.querySelector("#__tagembed__search_option");
    __tagembed__search_option.innerHTML = "";
    let __tagembed__input_search_youtube = document.querySelector("#__tagembed__input_search_youtube");
    __tagembed__input_search_youtube.style.display = 'none';
    let __tagembed__youtube_channel_data = document.querySelector("#__tagembed__youtube_channel_data").value;
    let __tagembed__youtube_channel_search_loader = document.querySelector("#__tagembed__youtube_channel_search_loader");
    if (__tagembed__youtube_channel_data && __tagembed__youtube_channel_data.length > 3) {
	__tagembed__youtube_channel_search_loader.style.display = 'block';
	let __tagembed__toast = new TagembedToast;
	let formData = new FormData();
	formData.append('action', 'data');
	formData.append('youtubeChannelData', __tagembed__youtube_channel_data);
	formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	formData.append('__tagembed__ajax_action', '__tagembed__search_youtube_channel');
	fetch(__tagembed__ajax_url, {
	    method: 'POST',
	    headers: {
		'x-requested-with': 'XMLHttpRequest',
	    },
	    body: formData,
	}).then(response => {
	    return response.json()
	}).then(response => {
	    if (response.status == true) {
		__tagembed__search_option.style.display = 'block';
		let elemHTML = `<ul>`;
		if (response.data.length > 0) {
		    for (let index in response.data)
			elemHTML = `${elemHTML} <li onClick="__tagembed__youtubeSearchData('${response.data[index].youtubeId}','${response.data[index].youtubeName}','${type}')" value="${response.data[index].youtubeId}"><img src="${response.data[index].youtubeImage}" alt="image" /> ${response.data[index].youtubeName}</li>`;
		} else {
		    elemHTML = `${elemHTML} <li value="">Not Found</li>`;
		}
		elemHTML = `${elemHTML} </ul>`;
		__tagembed__search_option.innerHTML = elemHTML;
		__tagembed__youtube_channel_search_loader.style.display = 'none';
		__tagembed__input_search_youtube.style.display = 'flex';
	    } else {
		__tagembed__search_option.innerHTML = "";
		__tagembed__youtube_channel_search_loader.style.display = 'none';
		__tagembed__input_search_youtube.style.display = 'flex';
		if (response.hasOwnProperty("message")) {
		    __tagembed__toast.danger({message: response.message, position: '__tagembed__is-top-right'});
		} else {
		    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
		}
	    }
	}).catch((error) => {
	    console.log(error);
	    __tagembed__close_loader();
	    __tagembed__search_option.innerHTML = "";
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    __tagembed__youtube_channel_search_loader.style.display = 'none';
	    __tagembed__input_search_youtube.style.display = 'flex';
	});
    } else {
	__tagembed__feed_error.innerHTML = "Enter Minimum 4 Characters";
	__tagembed__feed_error.style.display = 'block';
	__tagembed__search_option.innerHTML = "";
	__tagembed__youtube_channel_search_loader.style.display = 'none';
	__tagembed__input_search_youtube.style.display = 'flex';
}
}
function __tagembed__youtubeSearchData(youtubeId, youtubeName, type) {
    let __tagembed__toast = new TagembedToast;
    if (!youtubeId || !youtubeName)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    document.querySelector("#__tagembed__youtube_channel_data").value = youtubeName;
    document.querySelector("#__tagembed__youtube_id").value = youtubeId;
    document.querySelector("#__tagembed__youtube_name").value = youtubeName;
    document.querySelector("#__tagembed__search_option").innerHTML = "";
    if (type && type == 'playlist') {
	__tagembed__getYoutubePlaylist(youtubeId);
    }
}
/*--Start--Get Youtube Channel Playlist*/
function __tagembed__getYoutubePlaylist(youtubeId) {
    let __tagembed__search_option = document.querySelector("#__tagembed__search_option");
    __tagembed__search_option.innerHTML = "";
    __tagembed__open_loader();
    let __tagembed__toast = new TagembedToast;
    let formData = new FormData();
    formData.append('action', 'data');
    formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
    formData.append('__tagembed__ajax_action', '__tagembed__get_youtube_playlist');
    formData.append('youtubeId', youtubeId);
    fetch(__tagembed__ajax_url, {
	method: 'POST',
	headers: {'x-requested-with': 'XMLHttpRequest'},
	body: formData,
    }).then(response => {
	return response.json()
    }).then(response => {
	__tagembed__close_loader();
	if (response.status == true) {
	    let elemHTML = `<label>Select Playlist</label><select name="youtubePlaylist" id="__tagembed__playlist_data">`;
	    if (response.data.length > 0) {
		for (let index in response.data)
		    elemHTML = `${elemHTML} <option value="${response.data[index].youtubeId}#${response.data[index].youtubeName}">${response.data[index].youtubeName}</option>`;
	    } else {
		elemHTML = `${elemHTML} <option value="">Not Found</option>`;
	    }
	    elemHTML = `${elemHTML} </select>`;
	    __tagembed__search_option.style.display = 'block';
	    __tagembed__search_option.innerHTML = elemHTML;
	} else {
	    __tagembed__search_option.innerHTML = "";
	    __tagembed__search_option.style.display = 'none';
	    __tagembed__close_loader();
	    if (response.hasOwnProperty("message")) {
		__tagembed__toast.danger({message: response.message, position: '__tagembed__is-top-right'});
	    } else {
		__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    }
	}
    }).catch((error) => {
	console.log(error);
	__tagembed__close_loader();
	__tagembed__search_option.innerHTML = "";
	__tagembed__search_option.style.display = 'none';
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    });
}
/*--End--Get Youtube Channel Playlist*/
/*--End-- Search Youtube Data */
/*--End--Create Youtube Feed*/
/*--Start--Create Vimeo Feed*/
function __tagembed__createVimeoFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    /*Already Exist Accounts*/
    let __tagembed__exist_auth = __tagembed__alreadyExistAuth();
    switch (__tagembed__feed_data.filterId) {
	case "1":
	    break;
	case "2":
	    __tagembed__feed_data.inputs = [{label: 'Hashtag', type: 'text', name: 'feed', placeholder: 'Enter Hashtag'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    if (__tagembed__exist_auth.alreadyAuthOption.length > 0)
	__tagembed__feed_data.inputs = __tagembed__exist_auth.alreadyAuthOption.concat(__tagembed__feed_data.inputs);
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Vimeo Feed*/
/*--Start--Create Linkdin Feed*/
function __tagembed__createLinkdinFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    switch (__tagembed__feed_data.filterId) {
	case "1":
	    __tagembed__feed_data.inputs = [{label: 'Profile Page Url', type: 'text', name: 'feed', placeholder: 'Enter Profile Page URL'}];
	    break;
	case "2":
	    __tagembed__feed_data.inputs = [{label: 'HashTag', type: 'text', name: 'feed', placeholder: 'Enter HashTag'}];
	    break;
	case "16":
	    __tagembed__feed_data.inputs = [{label: 'Post Url', type: 'text', name: 'feed', placeholder: 'Enter Post URL'}];
	    break;
	case "17":
	    __tagembed__feed_data.inputs = [{label: 'Company Page Url', type: 'text', name: 'feed', placeholder: 'Enter Company Page URL'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Linkdin Feed*/
/*--Start--Create Tumblr Feed*/
function __tagembed__createTumblrFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});

    switch (__tagembed__feed_data.filterId) {
	case "1":
	    __tagembed__feed_data.inputs = [{label: 'Handel', type: 'text', name: 'feed', placeholder: 'Enter User Handle'}];
	    break;
	case "2":
	    __tagembed__feed_data.inputs = [{label: 'Hashtag', type: 'text', name: 'feed', placeholder: 'Enter Hashtag'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Tumblr Feed*/
/*--Start--Create Rss Feed*/
function __tagembed__createRssFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    switch (__tagembed__feed_data.filterId) {
	case "13":
	    __tagembed__feed_data.inputs = [{label: 'Name', type: 'text', name: 'name', placeholder: 'Enter Name'}, {label: 'Rss Url', type: 'text', name: 'feed', placeholder: 'Enter Rss URL'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Rss Feed*/
/*--Start--Create Instagram Business Feed*/
function __tagembed__createInstagramBusinessFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    /*Already Exist Accounts*/
    let __tagembed__exist_auth = __tagembed__alreadyExistAuth();
    switch (__tagembed__feed_data.filterId) {
	case "1":
	case "73":
	    __tagembed__feed_data.networkId = 2;
	    break;
	case "23":
	    __tagembed__feed_data.inputs = [{label: 'Handle Url', type: 'text', name: 'feed', placeholder: 'Enter Handle Url'}];
	    break;
	case "24":
	    break;
	case "25":
	    break;
	case "26":
	    __tagembed__feed_data.inputs = [{label: 'Hashtag', type: 'text', name: 'feed', placeholder: 'Enter Hashtag'}, {label: 'Get Posts Containing Hashtag Only In Caption', type: 'checkbox', name: 'hashtagCaption'}, {label: 'Give Preference To Recent Posts Over Top Posts From The Hashtag', type: 'checkbox', name: 'hashtagOlder'}];
	    break;
	case "34":
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    if (__tagembed__exist_auth.alreadyAuthOption.length > 0)
	__tagembed__feed_data.inputs = __tagembed__exist_auth.alreadyAuthOption.concat(__tagembed__feed_data.inputs);
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Instagram Business Feed*/
/*--Start--Create Yelp Feed*/
function __tagembed__createYelpFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    /*Already Exist Accounts*/
    let __tagembed__exist_auth = __tagembed__alreadyExistAuth();
    switch (__tagembed__feed_data.filterId) {
	case "27":
	case "28":
	    __tagembed__feed_data.inputs = [{label: 'Enter Business Page Url', type: 'text', name: 'feed', placeholder: 'Enter Business Page Url'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    if (__tagembed__exist_auth.alreadyAuthOption.length > 0)
	__tagembed__feed_data.inputs = __tagembed__exist_auth.alreadyAuthOption.concat(__tagembed__feed_data.inputs);
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Yelp Feed*/
/*--Start--Create Slack Feed*/
var __tagembed__searchSlackChannelList = false;
function __tagembed__createSlackFeed(__tagembed__feed_data) {
    let setOnlyParentNetwork = (__tagembed__feed_data.filterId == 1) ? true : false;/*Manage Connected Account On Facebook Handel Time */
    let __tagembed__exist_auth = __tagembed__alreadyExistAuth(setOnlyParentNetwork); /*Already Exist Accounts*/
    switch (__tagembed__feed_data.filterId) {
	case "1":
	    break;
	default:
	    document.getElementById("__tagembed__create_feed_form").innerHTML = null;/*First Remove Form Data*/
	    return __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    break;
    }
    if (__tagembed__exist_auth.alreadyAuthOption.length > 0) {
	switch (__tagembed__feed_data.filterId) {
	    case "1":
		let options = [{name: 'Select Channel', value: ''}];
		__tagembed__feed_data.inputs = [{label: 'Select Slack Channel', type: 'select', name: 'slackChannelList', id: '__tagembed__account_slack_channel', options: options}];
		break;
	}
	__tagembed__feed_data.inputs = __tagembed__exist_auth.alreadyAuthOption.concat(__tagembed__feed_data.inputs);
	__tagembed__searchSlackChannelList = true;/*Use For Search Slack Channel Flag*/
    }
    __tagembed__create_feed(__tagembed__feed_data);
    /*--Start-- Get And Set Channel List On First Time*/
    if (__tagembed__exist_auth.alreadyAuthOption.length > 0) {
	let __tagembed__connected_accountsId = __tagembed__exist_auth.alreadyAuthOption.concat(__tagembed__feed_data.inputs)[0]['options'][0]['value'];
	__tagembed__getSlackChannelList(__tagembed__connected_accountsId);
    }
    /*--End-- Get And Set Channel List On First Time*/
}
function __tagembed__getSlackChannelList(__tagembed__connected_accountsId = null) {
    let __tagembed__get_connected_accountsId = __tagembed__connected_accountsId !== null ? __tagembed__connected_accountsId : document.querySelector("#__tagembed__connected_accounts").selectedOptions[0].value;
    if (__tagembed__get_connected_accountsId !== '') {
	let __tagembed__account_slack_channel = document.querySelector("#__tagembed__account_slack_channel");
	__tagembed__open_loader();
	let formData = new FormData();
	formData.append('action', 'data');
	formData.append('connectedAccountsId', __tagembed__get_connected_accountsId);
	formData.append('__tagembed__ajax_action', '__tagembed__get_slack_channel_list');
	formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	fetch(__tagembed__ajax_url, {method: 'POST', headers: {'x-requested-with': 'XMLHttpRequest'}, body: formData,
	}).then(response => {
	    return response.json();
	}).then(response => {
	    __tagembed__close_loader();
	    if (response.status == true) {
		let elemHTML = ``;
		if (response.data) {
		    for (let index in response.data)
			elemHTML = `${elemHTML} <option value="${response.data[index].id}#${response.data[index].name}">${response.data[index].name}</option>`;
		} else {
		    elemHTML = `${elemHTML} <option value="">This Slack Channel Not Found</option>`;
		}
		elemHTML = `${elemHTML}`;
		__tagembed__account_slack_channel.innerHTML = elemHTML;
		__tagembed__account_slack_channel.parentElement.style.display = 'block';
	    } else {
		__tagembed__account_slack_channel.innerHTML = '';
		__tagembed__account_slack_channel.parentElement.style.display = 'none';
	    }
	}).catch((error) => {
	    console.log(error);
	    __tagembed__close_loader();
	    __tagembed__account_slack_channel.innerHTML = '';
	    __tagembed__account_slack_channel.style.display = 'none';
	    return __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	});
}
}
/*--End--Create Slack Feed*/
/*--Start--Create Airbnb Feed*/
function __tagembed__createAirbnbFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    switch (__tagembed__feed_data.filterId) {
	case "56":
	    __tagembed__feed_data.inputs = [{label: 'Airbnb List Url', type: 'text', name: 'feed', placeholder: 'Enter List URL : https://www.airbnb.co.in/rooms/50158480'}];
	    break;
	case "57":
	    __tagembed__feed_data.inputs = [{label: 'Airbnb Experience Url', type: 'text', name: 'feed', placeholder: 'Enter Experience URL : https://www.airbnb.co.in/experiences/101525'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Airbnb Feed*/
/*--Start--Create Capeterra Feed*/
function __tagembed__createCapeterraFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    switch (__tagembed__feed_data.filterId) {
	case "68":
	    __tagembed__feed_data.inputs = [{label: 'Enter Capterra Company Page Url', type: 'text', name: 'feed', placeholder: 'Enter Capterra Company Page Url'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Capeterra Feed*/
/*--Start--Create Etsy Feed*/
function __tagembed__createEtsyFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    switch (__tagembed__feed_data.filterId) {
	case "69":
	    __tagembed__feed_data.inputs = [{label: 'Enter Shop Page Url', type: 'text', name: 'feed', placeholder: 'Enter Shop Page Url'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Etsy Feed*/
/*--Start--Create Tiktok Feed*/
function __tagembed__createTiktokFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    /*Already Exist Accounts*/
    let __tagembed__exist_auth = __tagembed__alreadyExistAuth();
    switch (__tagembed__feed_data.filterId) {
	case "79":
	    break;
	case "72":
	    __tagembed__feed_data.inputs = [{label: 'Hashtag', type: 'text', name: 'feed', placeholder: 'Enter Hashtag'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    if (__tagembed__feed_data.filterId != 72) {
	if (__tagembed__exist_auth.alreadyAuthOption.length > 0)
	    __tagembed__feed_data.inputs = __tagembed__exist_auth.alreadyAuthOption.concat(__tagembed__feed_data.inputs);
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Tiktok Feed*/
/*--Start--Create Vk Feed*/
function __tagembed__createVkFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    /*Already Exist Accounts*/
    switch (__tagembed__feed_data.filterId) {
	case "1":
	    break;
	case "10":
	    __tagembed__feed_data.inputs = [{label: 'Search', id: '__tagembed__vk_communities', jsFunction: 'onkeyup="__tagembed__searchVkCommunities();"', type: 'text', name: 'feed', placeholder: 'Enter Communities Name', extraTag: 'search_option', inputLoader: 'vk_communities_search_loader'}, {id: '__tagembed__communities_id', type: 'hidden', name: 'communitiesId'}, {id: '__tagembed__communities_name', type: 'hidden', name: 'communitiesName'}];
	    break;
	case "2":
	    __tagembed__feed_data.inputs = [{label: 'Hashtag', type: 'text', name: 'feed', placeholder: 'Enter Hashtag'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    if (__tagembed__feed_data.filterId == 1) {
	let __tagembed__exist_auth = __tagembed__alreadyExistAuth();
	if (__tagembed__exist_auth.alreadyAuthOption.length > 0)
	    __tagembed__feed_data.inputs = __tagembed__exist_auth.alreadyAuthOption.concat(__tagembed__feed_data.inputs);
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--Start-- Search Vk Communities*/
function __tagembed__searchVkCommunities() {
    let __tagembed__vk_communities = document.querySelector("#__tagembed__vk_communities").value;
    let __tagembed__search_option = document.querySelector("#__tagembed__search_option");
    let __tagembed__vk_communities_search_loader = document.querySelector("#__tagembed__vk_communities_search_loader");
    if (__tagembed__vk_communities && __tagembed__vk_communities.length > 2) {
	__tagembed__vk_communities_search_loader.style.display = 'block';
	/*__tagembed__search_option.innerHTML = '';*/
	let __tagembed__toast = new TagembedToast;
	let formData = new FormData();
	formData.append('action', 'data');
	formData.append('vkCommunitiesName', __tagembed__vk_communities);
	formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	formData.append('__tagembed__ajax_action', '__tagembed__search_vk_communities');
	fetch(__tagembed__ajax_url, {
	    method: 'POST',
	    headers: {
		'x-requested-with': 'XMLHttpRequest',
	    },
	    body: formData,
	}).then(response => {
	    return response.json()
	}).then(response => {
	    if (response.status == true) {
		let elemHTML = `<ul>`;
		if (response.data) {
		    for (let index in response.data)
			elemHTML = `${elemHTML} <li onClick="__tagembed__manageVkCommunitiesData('${response.data[index].id}','${response.data[index].screen_name}')" value="${response.data[index].id}"> <img style="min-width:20px;max-width:20px;" src="${response.data[index].photo_100}" alt="image" />${response.data[index].screen_name}</li>`;
		} else {
		    elemHTML = `${elemHTML} <li value="">Not Found</li>`;
		}
		elemHTML = `${elemHTML} </ul>`;
		__tagembed__search_option.innerHTML = elemHTML;
		__tagembed__vk_communities_search_loader.style.display = 'none';
	    } else {
		__tagembed__search_option.innerHTML = '';
		__tagembed__vk_communities_search_loader.style.display = 'none';
		if (response.hasOwnProperty("message")) {
		    __tagembed__toast.danger({message: response.message, position: '__tagembed__is-top-right'});
		} else {
		    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
		}
	    }
	}).catch((error) => {
	    console.log(error);
	    __tagembed__close_loader();
	    __tagembed__search_option.innerHTML = '';
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    __tagembed__vk_communities_search_loader.style.display = 'none';
	});
    } else {
	__tagembed__search_option.innerHTML = '';
	__tagembed__vk_communities_search_loader.style.display = 'none';
    }
}
function __tagembed__manageVkCommunitiesData(__tagembed__communities_id, __tagembed__communities_name) {
    let __tagembed__toast = new TagembedToast;
    if (!__tagembed__communities_id || !__tagembed__communities_name)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    document.querySelector("#__tagembed__vk_communities").value = __tagembed__communities_name;
    document.querySelector("#__tagembed__communities_id").value = __tagembed__communities_id;
    document.querySelector("#__tagembed__communities_name").value = __tagembed__communities_name;
    document.querySelector("#__tagembed__search_option").innerHTML = '';
}
/*--End-- Search Vk Communities*/
/*--End--Create Vk Feed*/
/*--Start--Create Trustpilot Feed*/
function __tagembed__createTrustpilotFeed(__tagembed__feed_data) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    switch (__tagembed__feed_data.filterId) {
	case "76":
	    __tagembed__feed_data.inputs = [{label: 'Trustpilot Url', type: 'text', name: 'feed', placeholder: 'Enter URL : https://www.trustpilot.com/review/leapinlizardlabels.com'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    return;
	    break;
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Trustpilot Feed*/
/*--Start--Create Amazon Feed*/
function __tagembed__createAmazonFeed(__tagembed__feed_data) {
    switch (__tagembed__feed_data.filterId) {
	case "77":
	    __tagembed__feed_data.inputs = [{label: 'Amazon Url', type: 'text', name: 'feed', placeholder: 'Enter URL : https://www.amazon.com/NUBWO-Wireless-Crystal-Clear-Microphone-Ergonomic/product-reviews/B08TBF4S42/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    break;
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Amazon Feed*/
/*--Start--Create Tripadvisor Feed*/
function __tagembed__createTripadvisorFeed(__tagembed__feed_data) {
    switch (__tagembed__feed_data.filterId) {
	case "78":
	    __tagembed__feed_data.inputs = [{label: 'Tripadvisor Restaurant Url', type: 'text', name: 'feed', placeholder: 'Enter URL : https://www.tripadvisor.in/Restaurant_Review-g294013-d25147582-Reviews-Entrecote_Cafe_de_Paris_YAS_Mall-Abu_Dhabi_Emirate_of_Abu_Dhabi.html'}];
	    break;
	case "80":
	    __tagembed__feed_data.inputs = [{label: 'Tripadvisor Hotel Url', type: 'text', name: 'feed', placeholder: 'Enter URL : https://www.tripadvisor.in/Hotel_Review-g294013-d953102-Reviews-Erth_Abu_Dhabi-Abu_Dhabi_Emirate_of_Abu_Dhabi.html'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    break;
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Tripadvisor Feed*/
/*--Start--Create Aliexpress Feed*/
function __tagembed__createAliexpressFeed(__tagembed__feed_data) {
    switch (__tagembed__feed_data.filterId) {
	case "83":
	    __tagembed__feed_data.inputs = [{label: 'Aliexpress Product Url', type: 'text', name: 'feed', placeholder: 'Enter URL : https://www.aliexpress.com/item/1005005773831583.html'}];
	    break;
	default:
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
	    break;
    }
    __tagembed__create_feed(__tagembed__feed_data);
}
/*--End--Create Aliexpress Feed*/

/*--Start--Manage Already Exist Accounts*/
function __tagembed__alreadyExistAuth(setOnlyParentNetwork = false) {
    /*--Start--Manage Already Exist Auth*/
    let alreadyAuthOption = [];
    if (__tagembed__network_already_exist_auth.hasOwnProperty("child") && Object.keys(__tagembed__network_already_exist_auth.child).length > 0 && !setOnlyParentNetwork) {
	for (let index in __tagembed__network_already_exist_auth.child) {
	    alreadyAuthOption[index] = {name: __tagembed__network_already_exist_auth.child[index].accountName, value: __tagembed__network_already_exist_auth.child[index].id};
	}
	alreadyAuthOption = alreadyAuthOption.concat([{name: 'Other', value: 0}]);
	alreadyAuthOption = [{label: 'Connected Accounts', id: '__tagembed__connected_accounts', type: 'select', name: 'authId', jsFunction: 'onChange="__tagembed__connectedAccountsOnChange();"', options: alreadyAuthOption}];
    } else if (__tagembed__network_already_exist_auth.hasOwnProperty("parent") && Object.keys(__tagembed__network_already_exist_auth.parent).length > 0) {
	for (let index in __tagembed__network_already_exist_auth.parent) {
	    alreadyAuthOption[index] = {name: __tagembed__network_already_exist_auth.parent[index].accountName, value: __tagembed__network_already_exist_auth.parent[index].id};
	}
	alreadyAuthOption = alreadyAuthOption.concat([{name: 'Other', value: 0}]);
	alreadyAuthOption = [{label: 'Connected Accounts', id: '__tagembed__connected_accounts', type: 'select', name: 'authId', jsFunction: 'onChange="__tagembed__connectedAccountsOnChange();"', options: alreadyAuthOption}];
    }
    return {alreadyAuthOption: alreadyAuthOption};
    /*--End--Manage Already Exist Auth*/
}
/*--Start-- Manage Data On Already Already Exist Accounts Change*/
function __tagembed__connectedAccountsOnChange() {
    let __tagembed__connected_accountsId = document.querySelector("#__tagembed__connected_accounts").selectedOptions[0].value;
    /*--Start-- Get Facebook Page Album*/
    let __tagembed__account_album_type = document.querySelector("#__tagembed__account_album_type");
    if (__tagembed__account_album_type) {
	if (__tagembed__connected_accountsId == 0) {
	    let __tagembed__facebook_album_section = document.querySelector("#__tagembed__facebook_album_section");
	    __tagembed__facebook_album_section.style.display = 'none';
	    return;
	} else {
	    __tagembed__facebook_album_section.style.display = 'block';
	}
	__tagembed__account_album_type = __tagembed__account_album_type.selectedOptions[0].value;
	if (__tagembed__account_album_type == 65) {
	    __tagembed__getFacebookPageAlbums();
	}
    }
    /*--End-- Get Facebook Page Album*/
    /*--Start--Search Slack Chanel List On Account Change Change*/
    if (__tagembed__searchSlackChannelList)
	__tagembed__getSlackChannelList();
    /*--End--Search Slack Chanel List On Account Change Change*/
}
/*--End-- Manage Data On Already Already Exist Accounts Change*/
/*--End--Manage Already Exist Accounts*/
/*--Start-- Update Feed Status*/
function __tagembed__updateFeedStauts(count) {
    let __tagembed__feed = document.querySelector(`#feed_${count}`);
    let __tagembed__widget_id = __tagembed__feed.getAttribute('data-widgetId');
    let __tagembed__feed_id = __tagembed__feed.getAttribute('data-feedId');
    let __tagembed__feed_status = __tagembed__feed.getAttribute('data-feedStatus');
    /*Manage Toggel Botton On Space*/
    if (__tagembed__manageToggelOnPressSpace())
	return;
    let __tagembed__toast = new TagembedToast;
    if (!__tagembed__feed_id || !__tagembed__widget_id || !__tagembed__feed_status)
	return __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    /*confirmDialog({title: 'Yes, update feed status', message: 'Are you sure! do you want to update feed status?', buttonText: 'Update', type: 'warning'}, function () {*/
    let formData = new FormData();
    formData.append('feedId', __tagembed__feed_id);
    formData.append('widgetId', __tagembed__widget_id);
    formData.append('status', __tagembed__feed_status);
    formData.append('action', 'data');
    formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
    formData.append('__tagembed__ajax_action', '__tagembed__update_feed_status');
    __tagembed__open_loader();
    fetch(__tagembed__ajax_url, {
	method: 'POST',
	headers: {
	    'x-requested-with': 'XMLHttpRequest', },
	body: formData,
    }).then(response => {
	return response.json()
    }).then(response => {
	__tagembed__close_loader();
	if (response.status == true) {
	    if (response.data.hasOwnProperty("message")) {
		__tagembed__toast.success({message: response.data.message, position: '__tagembed__is-top-right'});
	    }
	    /*Manage Feed Status*/
	    switch (__tagembed__feed_status) {
		case '0':
		    __tagembed__feed.setAttribute("data-feedStatus", '1');
		    break;
		case '1':
		    __tagembed__feed.setAttribute("data-feedStatus", '0');
		    break;
		default:
		    break;
	    }

	} else {
	    if (response.hasOwnProperty("message")) {
		__tagembed__toast.danger({message: response.message, position: '__tagembed__is-top-right'});
	    } else {
		__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    }
	}
    }).catch((error) => {
	console.log(error);
	__tagembed__close_loader();
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    });
    /*});*/
}
/*--End-- Update Feed Status*/
/*--Start-- Delete Feed*/
function __tagembed__deleteFeed(__tagembed__feed_id, __tagembed__widget_id, __tagembed__feedbox_id) {
    let __tagembed__toast = new TagembedToast;
    if (!__tagembed__feed_id || !__tagembed__widget_id || !__tagembed__feedbox_id)
	return __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    confirmDialog({title: 'Yes, delete feed', message: 'Are you sure! do you want to delete feed?', buttonText: 'Delete', type: 'danger'}, function () {
	let formData = new FormData();
	formData.append('feedId', __tagembed__feed_id);
	formData.append('widgetId', __tagembed__widget_id);
	formData.append('action', 'data');
	formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	formData.append('__tagembed__ajax_action', '__tagembed__delete_feed');
	__tagembed__open_loader();
	var __tagembed__toast = new TagembedToast;
	fetch(__tagembed__ajax_url, {
	    method: 'POST',
	    headers: {
		'x-requested-with': 'XMLHttpRequest', },
	    body: formData,
	}).then(response => {
	    return response.json()
	}).then(response => {
	    __tagembed__close_loader();
	    if (response.status == true) {
		document.querySelector('#' + __tagembed__feedbox_id).remove();
		if (response.data.hasOwnProperty("message")) {
		    __tagembed__toast.success({message: response.data.message, position: '__tagembed__is-top-right'});
		}
	    } else {
		if (response.hasOwnProperty("message")) {
		    __tagembed__toast.danger({message: response.message, position: '__tagembed__is-top-right'});
		} else {
		    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
		}
	    }
	}).catch((error) => {
	    console.log(error);
	    __tagembed__close_loader();
	    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	});
    });
}
/*--End-- Delete Feed*/
/*--Start-- Get Creadet Feed*/
window.addEventListener ? window.addEventListener("load", __tagembed__getFeed, false) : window.attachEvent && window.attachEvent("onload", __tagembed__getFeed);
function __tagembed__getFeed() {
    /*if (__tagembed__manageApiCall())
     return;*/
    /*Manage Copy Embed Code Section*/
    let __tagembed__copycode = document.getElementById("__tagembed__copycode");
    /*Manage Widget Error*/
    let widgetData = document.querySelector("#__tagembed__widgets").selectedOptions[0];
    let __tagembed__widgetId = widgetData.value.split('#')[0];
    let __tagembed__feed = document.getElementById("__tagembed__feed");
    let __tagembed__feed_data = document.getElementById("__tagembed__feed_data");

    let __tagembed__toast = new TagembedToast;
    let formData = new FormData();
    formData.append('action', 'data');
    formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
    formData.append('__tagembed__ajax_action', '__tagembed__get_feed');
    formData.append('widgetId', __tagembed__widgetId);
    __tagembed__open_loader();
    fetch(__tagembed__ajax_url, {
	method: 'POST',
	headers: {
	    'x-requested-with': 'XMLHttpRequest',
	},
	body: formData,
    }).then(response => {
	return response.json()
    }).then(response => {
	if (response.status == true) {
	    __tagembed__close_loader();
	    if (response.data.length > 0) {
		let elemHTML = `<ul class="__tagembed__conacclist">`;
		let count = 1;
		let __tagembed__feedbox_id = '__tagembed__feedbox_id';
		for (let index in response.data) {
		    __tagembed__feedbox_id = __tagembed__feedbox_id + count;
		    elemHTML = `${elemHTML}<li id="${__tagembed__feedbox_id}">`;
		    elemHTML = `${elemHTML}<div class="__tagembed__checkbox __tagembed__reconninn">`;
		    elemHTML = `${elemHTML}<div class="__tagembed__feediconame"><label><img class="" src="${__tagembed__plugin_url_for_js}assets/images/network/${response.data[index].Feed.networkId}.png"/></label>`;
		    elemHTML = `${elemHTML}<span title="${response.data[index].Feed.name}"><img class="" src="${response.data[index].Filter.image}"/> <b>${response.data[index].Feed.name} : ${response.data[index].Filter.name}</b></span></div>`;
		    if (response.data[index].Feed.api == 3 || response.data[index].Feed.api == 4)
			elemHTML = `${elemHTML}<div class="__tagembed__conn__actions"><a class="__tagembed__btn_reconn" href="javascript:void(0);" onclick="__tageembed__addUpdateAndRefreshAccount(${response.data[index].Feed.networkId},'reconnect','${response.data[index].Feed.accountId}',${response.data[index].Feed.id},${response.data[index].Feed.filterId},'${response.data[index].Feed.name}');"><i class="fas fa-redo-alt"></i> ${response.data[index].Feed.api == 3 ? 'Connect' : 'Reconnect'} </a></div>`;
		    elemHTML = `${elemHTML}</div>`;
		    elemHTML = `${elemHTML}<div class="__tagembed__mod__actions">`;
		    elemHTML = `${elemHTML}<div class="__tagembed__status">`;
		    elemHTML = `${elemHTML}<div class="__tagembed__toggleOnBut __tagembed__switch tooltip">`;
		    elemHTML = `${elemHTML}<div class="__tagembed__onoffswitch">`;
		    elemHTML = `${elemHTML}<input data-widgetId="${response.data[index].Feed.wallId}" data-feedId="${response.data[index].Feed.id}"  data-feedStatus="${response.data[index].Feed.status}"  id="feed_${count}" name="feed_${count}"  onchange="__tagembed__updateFeedStauts(${count});" type="checkbox"  class="__tagembed__onoffswitch-checkbox __tagembed__updateStatus" data-on-color="#009385" data-off-color="#989898" ${(response.data[index].Feed.status == 1) ? 'checked' : ''}>`;
		    elemHTML = `${elemHTML}<label class="__tagembed__onoffswitch-label" for="feed_${count}">`;
		    elemHTML = `${elemHTML}<span class="__tagembed__onoffswitch-inner"></span>`;
		    elemHTML = `${elemHTML}<span class="__tagembed__onoffswitch-switch"style="background: rgb(152, 152, 152);"></span>`;
		    elemHTML = `${elemHTML}</label></div>`;
		    elemHTML = `${elemHTML}<span class="tooltiptext">Status</span>`;
		    elemHTML = `${elemHTML}</div></div>`;
		    elemHTML = `${elemHTML}<div class="__tagembed__totalpostcount">`;
		    elemHTML = `${elemHTML}Total Post <span>${response.data[index].Feed.totalPost}</span>`;
		    elemHTML = `${elemHTML}</div>`;
		    elemHTML = `${elemHTML}<div class="__tagembed__moderation">`;
		    elemHTML = `${elemHTML}<a class="__tagembed__btn__trash" onclick="__tagembed__deleteFeed(${response.data[index].Feed.id},${response.data[index].Feed.wallId},'${__tagembed__feedbox_id}');" href="javascript:void(0);"><i class="fas fa-trash" aria-hidden="true"></i></a>`;
		    elemHTML = `${elemHTML}</div></div></li>`;
		    count++;
		}
		elemHTML = `${elemHTML}</ul>`;
		__tagembed__feed.style.display = 'flex';
		__tagembed__feed_data.innerHTML = elemHTML;
		__tagembed__copycode.style.display = 'flex';
		/*Manage Next And Back Link section Section*/
		manageNextAndBackLinkSectionHideShow('block');
	    } else {
		__tagembed__feed_data.innerHTML = '';
		__tagembed__feed.style.display = 'none';
		__tagembed__copycode.style.display = 'none';
		/*Manage Next And Back Link section Section*/
		manageNextAndBackLinkSectionHideShow('none');
	    }
	} else {
	    __tagembed__close_loader();
	    __tagembed__feed_data.innerHTML = '';
	    __tagembed__feed.style.display = 'none';
	    __tagembed__copycode.style.display = 'none';
	    /*Manage Next And Back Link section Section*/
	    manageNextAndBackLinkSectionHideShow('none');
	    if (response.hasOwnProperty("message")) {
		__tagembed__toast.danger({message: response.message, position: '__tagembed__is-top-right'});
	    } else {
		__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
	    }
	}
    }).catch((error) => {
	console.log(error);
	__tagembed__close_loader();
	__tagembed__feed_data.innerHTML = '';
	__tagembed__feed.style.display = 'none';
	__tagembed__copycode.style.display = 'none';
	/*Manage Next And Back Link section Section*/
	manageNextAndBackLinkSectionHideShow('none');
	__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    });
}
/*--End-- Get Creadet Feed*/
/*--Start-- Manage Next And Back Link Hide Show*/
function manageNextAndBackLinkSectionHideShow(hideShow) {
    /*Manage Next And Back Link section Section*/
    let __tagembed__next_and_back_link_section = document.getElementById("__tagembed__next_and_back_link_section");
    if (__tagembed__next_and_back_link_section)
	__tagembed__next_and_back_link_section.style.display = hideShow;
}
/*--End-- Manage Next And Back Link Hide Show*/
