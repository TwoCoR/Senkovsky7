class PostList {
	constructor (photoPosts) {
		this.posts = photoPosts;
		this.filter = undefined;
	}

    _sortByDate = (o1, o2) => {
        return Date.parse(o1.createdAt) - Date.parse(o2.createdAt);
    };

    getPage = (skip = 0, top = 10, filter) => {

        let tmp = this.posts;
        if(typeof skip !== "number" || typeof top !== "number") {
            return [];
        }
        if(!filter) {
            this.posts.sort(this._sortByDate);
        }

        if (filter) {
            if(filter.author && (typeof filter.author !== "string" || filter.author.length === 0) ||
                filter.createdAt && !filter.createdAt instanceof Date) {
                return [];
            }

            if(filter.author) {
                tmp = tmp.filter((item) => {
                    return item.author === filter.author;
                });
            }

            if(filter.createdAt) {
                tmp = tmp.filter((item) => {
                    return Date.parse(item.createdAt) === Date.parse(filter.createdAt);
                })
            }
            if(filter.hashtags){
                tmp = tmp.filter((item) => {
                    if(typeof item.hashtags === "undefined") {
                        return false;
                    }
                    return filter.hashtags.every((tag) =>{
                        return item.hashtags.includes(tag);
                    })
                })
            }
            
        }
        return tmp.slice(skip, skip + top);
        
    }
    getP = (id) => {
        if(typeof id == "string"){
            return this.posts.find((item) => item.id == id);
        }
        return -1;
    }
    static validate = (post) => {
        if (!post) {
            return false;
        }
        if(post.id === "" || typeof post.id !== "string") {
            return false;
        }
        if (post.description === "" || typeof post.description !== "string" || post.description.length === 0)
            return false;
        if (!(post.createdAt instanceof Date))
            return false;
        if (post.author === "" || typeof post.author !== "string")
            return false;
        if (post.photoLink === "" || typeof post.photoLink !== "string")
            return false;
        if (post.rating === null || typeof post.rating !== "number")
            return false;
        return true;
    }
    add = (post) => {
        if(PostList.validate(post)) {
            this.posts.push(post);
            this.posts.sort(PostList._sortByDate);
            return true;
        }
        else {
            return false;
        }
    }
    edit = (id, post) => {
        let index = this.posts.findIndex(item => item.id === id);
        if(typeof edit === 'undefined') {
            return false;
        }
		if(PostList.validate(post)) {
        	if(post.description) {
            	this.posts[index].description = post.description;
        	}
        	if(post.photoLink) {
            	this.posts[index].photoLink = post.photoLink;
        	}
        	if(post.hashtags) {
            	this.posts[index].hashtags = post.hashtags;
        	}
        	return true;
    	}
    	else {
    		return false;
    	}
    }
    remove = (id) => {
        if(typeof id == "string") {
            this.posts.splice(this.posts.findIndex(item => item.id === id), 1);
            return true;
        }
        return false;
    }
    addAll = (postArray) => {
    	let wrongPosts = [];
    	let count = 0;
    	for (let index = 0; index < postArray.length; index++) {
			if(PostList.validate(postArray[index])) {
            	this.posts.push(postArray[index]);
        	}
        	else {
            	wrongPosts[count] = postArray[index];
            	count++;
        	}
    	}
    	return wrongPosts;
    }
}
let postes = new PostList(photoPosts);


console.log('checking \'getPage(start: number, count: number, filter: object)\' function:'); 

console.log('getPage():'); 
console.log( postes.getPage() );

console.log('getPage(5):'); 
console.log( postes.getPage(5) ); 

console.log('getPage(\'5\'):'); 
console.log( postes.getPage('5') ); 

console.log('getPage(5, 3):'); 
console.log( postes.getPage(5, 3) ); 

console.log('getPage(5, \'3\'):'); 
console.log( postes.getPage(5, '3') ); 

console.log('getPage(5, 3, { author: \'Petya Petrov\' }):'); 
console.log( postes.getPage(5, 3, { author: 'Petya Petrov' }) ); 

console.log('getPage(5, 3, { author: \'WhatIslove BabyDontHurtovich\' }):'); 
console.log( postes.getPage(5, 3, { author: 'WhatIslove BabyDontHurtovich' }) ); 

/*console.log('getPhotoPosts(5, 3, { person: \'Petya Petrov\' }):'); 
console.log( postModule.getPhotoPosts(5, 3, { person: 'Petya Petrov' }) ); */2

console.log('getPage(5, 3, \'object\'):'); 
console.log( postes.getPage(5, 3, 'object') ); 

console.log('getPage(5, 4, { author: \'WhatIslove BabyDontHurtovich\', hashTags: [\'meme\'] })'); 
console.log( postes.getPage(5, 4, { author: 'WhatIslove BabyDontHurtovich', hashTags: ['meme'] }) ); 

console.log('getPage(5, 6, { createdAt: new Date(\'2019-03-05T00:00\') })'); 
console.log( postes.getPage(5, 6, { createdAt: new Date('2019-03-05T00:00') }) );

console.log('---------------'); 
console.log('\nchecking get(id: string) function:'); 
console.log('get(\'3\'):'); 
console.log( postes.getP('3') ); 

console.log('get(3):'); 
console.log( postes.getP(3) ); 

console.log('get(\'25\'):'); 
console.log( postes.getP('25') );
 
console.log('---------------'); 
console.log('\nchecking validate(photoPost: object) function:'); 
console.log('validate({}):'); 
console.log( PostList.validate({}) );

console.log('validate(photoPosts[0]):'); 
console.log(PostList.validate(photoPosts[0]) ); 

console.log('delete(photoPosts[0].author);\nvalidate(photoPosts[0]):'); 
delete(photoPosts[0].author); 
console.log(PostList.validate(photoPosts[0]) ); 

console.log('photoPost[1].id = 1\nvalidate(photoPost[1]):'); 
photoPosts[1].id = 1; 
console.log( PostList.validate(photoPosts[1]) );
 
console.log('---------------'); 
console.log('checking add(photoPost: object) function:'); 
console.log('add({}):'); 
console.log( postes.add({}) ); 

let post = { 
id: '21', 
description: 'this is an example for adding this post into the array', 
createdAt: new Date('2019-03-09T22:34:00'), 
author: 'shpillie-willie', 
photoLink: 'images/smoothOpening.jpg', 
hashTags: ['sausage', 'bignlong'], 
rating:322, 
}; 
console.log('add({' 
+ 'id: \'21\',' 
+ 'description: \'this is an example for adding this post into the array\',' 
+ 'createdAt: new Date(\'2019-03-05T00:00\'),' 
+ 'author: \'shpillie-willie\',' 
+ 'photoLink: \'images/smoothOpening.jpg\',' 
+ 'hashTags: [\'mem\'],' 
+ 'rating: 322;' 
+ '}\'):'); 
console.log( postes.add(post) ); 

console.log('delete(post.author)\nadd(post)'); 
delete(post.author); 
console.log( postes.add(post) );
 
console.log('---------------'); 
console.log('checking edit(id: string, photoPost: object) function:'); 
console.log('get(\'4\'):'); 
console.log( postes.getP('4') ); 
console.log('edit(\'4\', { author: \'moron5\', description: \'changed\' })'); 
console.log( postes.edit('4', { author: 'moron5', description: 'changed' })); 
console.log( postes.getP('4') ); 

console.log('get(\'4\')'); 
console.log( postes.getP('4') ); 
console.log('edit(\'4\', { author: \'moron5\', description: \'changed\' })'); 
console.log( postes.edit('4', { author: 'moron5', description: 'changed' }) ); 

console.log('get(\'5\')'); 
console.log( postes.getP('5') ); 
console.log('edit(\'5\', { author: \'moron5\', description: \'changed\', photoLink: \'changed\',' 
+ ' hashTags: [\'this\', \'are\', \'new\', \'hashTags\', 15, null] })'); 
console.log( postes.edit('5', { author: 'moron5', description: 'changed', photoLink: 'changed', 
hashTags: ['this', 'are', 'new', 'hashTags', 15, null] , fakeProp: 'none' }) ); 
console.log( postes.getP('5') );
 
console.log('---------------'); 
console.log('checking remove(id: string) function:'); 
console.log('remove(\'7\'):'); 
console.log( postes.remove('7') ); 
console.log(photoPosts);	

let postArray = [
{ 
		id: '22',
		description: 'Hey guys! <br /> Here you can se me preparing to make love to this beautiful can of "Baltika7" beer after a long day in university. <br />' +
							'It was a good day for sure. The beer was actually not so good, but beer is still beer so i was happy for sure.',
		createdAt: new Date('2019-03-05T23:00:00'),
		hashtags:['beer-and-suit','baltika7'],
   		author: 'Jim',
   		photoLink: 'images/me.jpg',
   		rating:100,
   	},
	{
		id: '23',
		description: 'Hey guys, here is my invention on how to use properly a can of beer. Make a hole with a knife,' +
		' chug the beer and with simple moves with your knife you can make a good dish to make your "Rolton" there. Use this lifehack and share this idea with your friends!',
		createdAt: new Date('2019-03-05T00:00'),
		hashtags:['lifehack','baltika9'],
		author: 'JigSaw',
		photoLink: 'images/baltika9.jpg',
		rating:210,
	},
	{
		id: '24',
		description: "Love is a great feeling, but only if it's mutual",
		createdAt: new Date('2019-03-05T00:00'),
		hashtags:['meme'],
		author: 'PIMP',
		photoLink: 'images/loveis.jpg',
		rating:1298,
	},
];
console.log('addAll function:');
console.log(postes.addAll(postArray));

console.log(photoPosts);	


let postArrayFake = [
{ 
		id: '25',
		description: 'Hey guys! <br /> Here you can se me preparing to make love to this beautiful can of "Baltika7" beer after a long day in university. <br />' +
							'It was a good day for sure. The beer was actually not so good, but beer is still beer so i was happy for sure.',
		createdAt: new Date('2019-03-05T23:00:00'),
		hashtags:['beer-and-suit','baltika7'],
   		author: 'Jim',
   		photoLink: 'images/me.jpg',
   		rating:100,
   	},
	{
		id: '26',
		description: 'Hey guys, here is my invention on how to use properly a can of beer. Make a hole with a knife,' +
		' chug the beer and with simple moves with your knife you can make a good dish to make your "Rolton" there. Use this lifehack and share this idea with your friends!',
		createdAt: new Date('2019-03-05T00:00'),
		hashtags:['lifehack','baltika9'],
		author: 'JigSaw',
		photoLink: 'images/baltika9.jpg',
		rating:210,
	},
	{
		id: '27',
		description: "Love is a great feeling, but only if it's mutual",
		createdAt: new Date('2019-03-05T00:00'),
		hashtags:['meme'],
		author: 'PIMP',
		photoLink: 'images/loveis.jpg',
		rating:1298,
	},
	{
	id: '28',
		description: 'Hey guys, look at me and my wife flexing this sunday at our vilage house!',
		createdAt: new Date('2019-03-05T00:00'),
		hashtags:[],
		author: 'Petya Petrov',
		photoLink: 'images/flex.jpg',
		rating:'laalala',	
	},
];
console.log('addAll with fake post');
console.log(postes.addAll(postArrayFake));

console.log(photoPosts);