Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  post"/login", to: "sessions#create"
  delete"/logout", to: "sessions#destroy"
  post"/signup", to: "users#create"
  get"/me", to: "users#show_loggedInUser" 
  get"/users/packages", to: "users#packages" 
  get"/users", to: "users#index"
  post"/users", to: "users#createUser"
  post"/users/admin", to: "users#createAdmin"
  resources :payments
  resources :packages
  resources :users
    # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
