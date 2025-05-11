export interface AuthenticationResponse {
    user: {
        id: string;
        email: string;
    };
    accessToken: `Bearer ${string}`;
}
