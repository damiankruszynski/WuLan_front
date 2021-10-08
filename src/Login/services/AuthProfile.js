export default function getProfile() {
    const profile = JSON.parse(localStorage.getItem('profile'));

    if (profile && profile.id) {
        return profile;
    } else {
        return null;
    }
}