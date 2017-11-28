const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment.js');
var data =[
    {
        name: 'Clouds Rest',
        image: 'https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas malesuada lorem a magna hendrerit efficitur. Vivamus dapibus, ligula a lobortis euismod, augue libero iaculis augue, et suscipit justo purus et ligula. Aliquam pulvinar justo sit amet urna semper, eu imperdiet lacus convallis. Quisque auctor, urna at mattis ullamcorper, dui augue elementum leo, in gravida dolor orci et ante. Proin rutrum, diam et dictum pulvinar, dolor leo pretium risus, et sagittis mi orci ut lacus. In lacinia, est non porttitor consectetur, ex ex aliquam dolor, ac blandit odio sapien ac sapien. Curabitur et elementum lorem, eget feugiat turpis. Quisque dapibus nec leo vel tempus. In eu nisl cursus, dictum diam sit amet, posuere felis. Aliquam condimentum justo arcu, ut lacinia lorem luctus aliquet.'
    },
    {
        name: 'Mountain rebel',
        image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas malesuada lorem a magna hendrerit efficitur. Vivamus dapibus, ligula a lobortis euismod, augue libero iaculis augue, et suscipit justo purus et ligula. Aliquam pulvinar justo sit amet urna semper, eu imperdiet lacus convallis. Quisque auctor, urna at mattis ullamcorper, dui augue elementum leo, in gravida dolor orci et ante. Proin rutrum, diam et dictum pulvinar, dolor leo pretium risus, et sagittis mi orci ut lacus. In lacinia, est non porttitor consectetur, ex ex aliquam dolor, ac blandit odio sapien ac sapien. Curabitur et elementum lorem, eget feugiat turpis. Quisque dapibus nec leo vel tempus. In eu nisl cursus, dictum diam sit amet, posuere felis. Aliquam condimentum justo arcu, ut lacinia lorem luctus aliquet.'
    },
    {
        name: 'Massive Camp',
        image: 'https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas malesuada lorem a magna hendrerit efficitur. Vivamus dapibus, ligula a lobortis euismod, augue libero iaculis augue, et suscipit justo purus et ligula. Aliquam pulvinar justo sit amet urna semper, eu imperdiet lacus convallis. Quisque auctor, urna at mattis ullamcorper, dui augue elementum leo, in gravida dolor orci et ante. Proin rutrum, diam et dictum pulvinar, dolor leo pretium risus, et sagittis mi orci ut lacus. In lacinia, est non porttitor consectetur, ex ex aliquam dolor, ac blandit odio sapien ac sapien. Curabitur et elementum lorem, eget feugiat turpis. Quisque dapibus nec leo vel tempus. In eu nisl cursus, dictum diam sit amet, posuere felis. Aliquam condimentum justo arcu, ut lacinia lorem luctus aliquet.'
    },
    {
        name: 'County forest',
        image: 'https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas malesuada lorem a magna hendrerit efficitur. Vivamus dapibus, ligula a lobortis euismod, augue libero iaculis augue, et suscipit justo purus et ligula. Aliquam pulvinar justo sit amet urna semper, eu imperdiet lacus convallis. Quisque auctor, urna at mattis ullamcorper, dui augue elementum leo, in gravida dolor orci et ante. Proin rutrum, diam et dictum pulvinar, dolor leo pretium risus, et sagittis mi orci ut lacus. In lacinia, est non porttitor consectetur, ex ex aliquam dolor, ac blandit odio sapien ac sapien. Curabitur et elementum lorem, eget feugiat turpis. Quisque dapibus nec leo vel tempus. In eu nisl cursus, dictum diam sit amet, posuere felis. Aliquam condimentum justo arcu, ut lacinia lorem luctus aliquet.'
    }
];
function seedDB() {
    Campground.remove({}, function(err){
        if(err){
    
        }else{
            console.log('Campgrounds cleared');
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
        
                    }else{
                        console.log('Campground added');
                        Comment.create(
                            {
                                text: 'This place is great, but I wish there was internet',
                                author: 'Garfield'
                            },function(err, comment){
                                if(err){

                                }else{
                                    campground.comments.push(comment);
                                    campground.save();
                                }
                               
                            });
                    }
                });
            });
        }
    });
    
}
module.exports = seedDB;
