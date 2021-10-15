export default function getProfile() {
    const profile = JSON.parse(localStorage.getItem('profile'));

    if (profile && profile.profileId) {
        return profile;
    } else {
        return null;
    }
}