class PhrasesController < ApplicationController
  def index; end

  def new
    ids = params[:ids]
    phrase = Phrase.where.not(id: ids.split(",").map(&:to_i)).order("RANDOM()").first
    respond_to do |format|
      format.json { render :json => phrase.slice(:id, :title) }
    end
  end  
end
