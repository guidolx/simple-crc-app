# simple-crc-app
This is a simple editor to create Class Responsibility Collaborators cards.
I have built it to learn Angular 4.0, because that's the best way for me to learn new stuff.
I didn't want to use a full CSS framework like Bootstrap which has a lot of premade components, 
so I extracted and customized some styles from Bulma.io.




![crcmodel](https://github.com/guidolx/simple-crc-app/blob/master/CRC_MODEL.png?raw=true)


Some of the features of the editor:
- The models are saved locally through the HTML5 Web Storage, no server required.
- Define different types of cards: entity, boundary, controller.
- Export/import JSON files.
- Keyboard shortcuts for main operations.
- The application automatically creates CRC Cards for collaborators.
- Dnd of cards.


A small user guide:
 - To edit an existing card, click once in the header of the card.
 - To drag a card, click and hold in the body zone of the card.
 Keyboard shortcuts:
  - 'CTRL-m': Create a new model.
  - 'CTRL-d': Delete current model from the local WEB storage.
  - 'CTRL-s': Save current model in local storage.
  - 'CTRL-o': Open a model from the local storage.
  - 'CTRL-u': Upload an external JSON file in the local storage.
  - 'CTRL-j': Downloads as a JSON file the current model.
   Escape closes the dialog.



Things are not yet perfect but useable at this stage.
The application is not (yet) responsive.

Some features I would like to add:
- A pdf export with jsPdf
- An SVG export.
- Maybe an auto-layouting feature.

Shouldn't be to difficult to implement,
these features are really just a couple of lines of code away.
The code base is small, so if you would like 
to contribute those features, I can help.


Here is the link to a hosted version on [github](https://guidolx.github.io/simple-crc-app/)


