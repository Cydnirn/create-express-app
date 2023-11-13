import { TypedEmitter } from "tiny-typed-emitter";

class AppEvent extends TypedEmitter<IAppEvent> {}

const appListener = new AppEvent();
appListener.setMaxListeners(2);

export default appListener;
