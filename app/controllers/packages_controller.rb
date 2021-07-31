class PackagesController < ApplicationController
    def index
        packages=Package.all
        render json: packages, include: :users
    end
    def show 
       package=Package.find_by(id: params[:id])
        if package
        render json: package
        else 
            render json: { error:"Not found" },status: :not_found
        end
    end
private
def package_params
    params.permit(:name, :price, :class_limit, :start_date,:end_date)
end

end
