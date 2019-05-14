class NewsArea {
  constructor() {
    this.postTemplate = document.getElementById('post-template');
    //this.edit_remove_buttonsTemplate = this.postTemplate.content.getElementById('edit-remove-buttonsTemplate');
    this.likeButton = this.postTemplate.content.querySelector('.like-button');
    this.postUL = document.querySelector('.post-ul');
    this.author = document.getElementById('authorID').textContent;
  }
  buildPostHTML(post) {
    const postItem = this.postTemplate.content.firstElementChild;
    postItem.id = post.id;
    this.postTemplate.content.querySelector('img').src = post.photoLink;
    this.postTemplate.content.querySelector('.post-info').textContent = `description: ${post.description}`;
    const generalPostInfo = this.postTemplate.content.querySelectorAll('.general-post-info');	
    if(post.hashtags.length) {
    	generalPostInfo.textContent = `${post.author} : ${post.createdAt.toLocaleDateString()} : #${post.hashtags.join('#')}`;
    }
	else {
		generalPostInfo.textContent = `${post.author} : ${post.createdAt.toLocaleDateString()}`;
	}
    const knot = document.importNode(this.postTemplate.content, true);
    if (post.author !== this.author) {
      let buttons = knot.querySelectorAll('.edit-remove-buttons');
      buttons[0].style.display = 'none';
      buttons[1].style.display = 'none';
    }
    return knot;
  }

  displayPage(posts) {
    const container = document.createElement('div');
    container.classList.toggle('posts-component');

    posts.forEach((post) => {
      container.appendChild(this.buildPostHTML(post));
    });

    this.postUL.append(container);
    console.log(container);
  }

  displayPost(post) {
    const container = document.createElement('div');
    container.classList.toggle('posts-component');

    container.appendChild(this.buildPostHTML(post));
    this.postUL.insertBefore(container, this.postUL.firstElementChild);
  }

  reloadPage(posts) {
    [...this.postUL.getElementsByClassName('posts-component')].forEach((component) => {
      this.postUL.removeChild(component);
    });

    this.displayPage(posts);
  }

  removePost(id) {
    document.getElementById(id).remove();
  }
}

const newsArea = new NewsArea();

newsArea.displayPage(photoPosts);

newsArea.removePost(1);

newsArea.displayPage(photoPosts);

newsArea.displayPost(photoPosts[0]);

//при вызове следующей функции отобразятся посты в исходном виде
//newsArea.reloadPage(photoPosts);

