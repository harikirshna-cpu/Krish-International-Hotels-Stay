class UserRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(options = {}) {
    const { page = 1, limit = 10, sort = '-createdAt' } = options;
    const skip = (page - 1) * limit;

    const users = await this.model.find()
      .select('-password')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await this.model.countDocuments();

    return {
      users,
      total,
      page,
      pages: Math.ceil(total / limit)
    };
  }

  async findById(id) {
    return await this.model.findById(id).select('-password');
  }

  async findByEmail(email) {
    return await this.model.findOne({ email }).select('+password');
  }

  async create(userData) {
    const user = new this.model(userData);
    return await user.save();
  }

  async update(id, updateData) {
    // Prevent password update through this method
    delete updateData.password;
    
    return await this.model.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    }).select('-password');
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async addToFavorites(userId, hotelId) {
    return await this.model.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: hotelId } },
      { new: true }
    ).select('-password');
  }

  async removeFromFavorites(userId, hotelId) {
    return await this.model.findByIdAndUpdate(
      userId,
      { $pull: { favorites: hotelId } },
      { new: true }
    ).select('-password');
  }

  async getFavorites(userId) {
    const user = await this.model.findById(userId)
      .populate('favorites')
      .select('favorites');
    return user ? user.favorites : [];
  }
}

module.exports = UserRepository;
