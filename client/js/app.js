import renderImages from './images/renderImages.jsx';
import backgroundsAdmin from './admin/backgroundsAdmin.jsx';
import projectsPanel from './admin/projects.jsx';
import showBanner from './dashboard/dashboard';
import {loginClick, logoutClick} from './authHelper';
import reviewTool from './images/reviewTool.jsx';
import users from './admin/users.jsx';
import toggleProfileForm from './profile/profile';
import goToReview from './dashboard/designer_review';
import showBannerPopup from './dashboard/designer_dashboard_banner';
import deleteReview from './dashboard/dashboard_delete_review';
import deleteBanner from './dashboard/dashboard_delete_banner';
import imageSlider from './images/slider.jsx';
import handleCreateProjectClick from './admin/create_project_field';
import {uploadButton} from './helpers';
import uploadFont from './admin/upload_font';
import {dropDown} from './projects/dropdown';

require('./../css/main.styl');
const Baz = require('bazooka');

Baz.register({
    'backgroundsAdmin': backgroundsAdmin,
    'renderImages': renderImages,
    'reviewTool': reviewTool,
    'showBanner': showBanner,
    'usersList': users,
    'toggleProfileForm': toggleProfileForm,
    "authLogout": logoutClick,
    'authLogin': loginClick,
    'imageSlider': imageSlider,
    'createProject': handleCreateProjectClick,
    'uploadButton': uploadButton,
    'projectsPanel': projectsPanel,
    'uploadFont': uploadFont,
    // dashboard
    'goToReview': goToReview,
    'showBannerPopup': showBannerPopup,
    'deleteReview': deleteReview,
    'deleteBanner': deleteBanner,
    'dropDown': dropDown
});

Baz.watch();
