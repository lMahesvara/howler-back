import User from '../models/User.js'

/**
 * Follows an user by updating its following list and followers list of the following user
 * 
 * @param {Request} req - Request to this function
 * @param {Response} res - Response of this function
 * @returns {User} User - Whole user with its following list updated.
 */
export const followUser = async (req, res) => {
    const { idUserFollow , idUser} = req.params
  
    if (!idUserFollow) {
      return res.status(400).json({ message: 'Please provide an userID to follow'})
    }

    if(!idUser){
      return res.status(400).json({ message: 'Please provide an userID to add the follow'})
    }
  
    try {

      //Update current user Following List
      const user = await User.findByIdAndUpdate(
        idUser , 
        {following : [idUserFollow]} ,
        {new : true}
      )

      //Update Followed user Followers List
      const userFollowed = await User.findByIdAndUpdate(
        idUserFollow,
        {followers : [idUser]} ,
        {new : true}
      )

      res.status(200).json({user})
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

/**
 * Fetch all the followers of a given user.
 * 
 * @param {Request} req - Request
 * @param {Response} res - Response
 * @returns {Array} Followers - Array of UserIDs who follow the requested user.
 */
export const getFollowers = async(req , res) => {
  const { idUser } = req.params

  if(!idUser){
    return res.status(400).json({ message: 'Please provide an userID to fetch its followers'})
  }

  try{
    const user = await User.findById(idUser)

    res.status(200).json({ followers: user.followers })
  }catch(error){
    res.status(500).json({ message : error.message })
  }
}

/**
 * Fetch all the users that are followed by the requested user
 * 
 * @param {Request} req - Request
 * @param {*} res - Response
 * @returns {Array} - Following - Array of UserIDs that are followed by the requested user.
 */
export const getFollowing = async(req , res) => {
  const { idUser } = req.params

  if(!idUser){
    return res.status(400).json({ message: 'Please provide an userID to fetch its followings'})
  }

  try{
    const user = await User.findById(idUser)

    res.status(200).json({ followings: user.following })
  }catch(error){
    res.status(500).json({ message : error.message })
  }
}

/**
 * Unfollows an user by updating its following list and followers list of the following user
 * 
 * @param {Request} req - Request to this function
 * @param {Response} res - Response of this function
 * @returns {User} User - Whole user with its following list updated.
 */
export const unfollowUser = async(req , res) => {
  const { idUserUnfollow , idUser} = req.params

  if (!idUserUnfollow) {
    return res.status(400).json({ message: 'Please provide an userID to unfollow'})
  }

  if(!idUser){
    return res.status(400).json({ message: 'Please provide an userID who will unfollow'})
  }

  try{

      //Update current user Following List
      const user = await User.findByIdAndUpdate(
        idUser , 
        {$pull : {following : idUserUnfollow}} ,
        {new : true}
      )

      //Update Followed user Followers List
      const userFollowed = await User.findByIdAndUpdate(
        idUserUnfollow,
        {$pull: {followers : idUser}} ,
        {new : true}
      )

      res.status(200).json({user})
    } catch (error) {
      res.status(500).json({ message: error.message })
 
    }
}