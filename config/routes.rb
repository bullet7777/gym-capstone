Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  post"/login", to: "sessions#create"
  delete"/logout", to: "sessions#destroy"
  post"/signup", to: "users#create"
  get"/me", to: "users#show" 
  get"/users/packages", to: "users#packages" 

  resources :payments
  resources :packages
    # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
