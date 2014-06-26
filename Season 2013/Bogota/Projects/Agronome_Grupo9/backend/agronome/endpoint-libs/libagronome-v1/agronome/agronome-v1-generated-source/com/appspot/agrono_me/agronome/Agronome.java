/*
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
/*
 * This code was generated by https://code.google.com/p/google-apis-client-generator/
 * (build: 2013-10-30 15:57:41 UTC)
 * on 2013-11-16 at 16:58:41 UTC 
 * Modify at your own risk.
 */

package com.appspot.agrono_me.agronome;

/**
 * Service definition for Agronome (v1).
 *
 * <p>
 * This is an API
 * </p>
 *
 * <p>
 * For more information about this service, see the
 * <a href="" target="_blank">API Documentation</a>
 * </p>
 *
 * <p>
 * This service uses {@link AgronomeRequestInitializer} to initialize global parameters via its
 * {@link Builder}.
 * </p>
 *
 * @since 1.3
 * @author Google, Inc.
 */
@SuppressWarnings("javadoc")
public class Agronome extends com.google.api.client.googleapis.services.json.AbstractGoogleJsonClient {

  // Note: Leave this static initializer at the top of the file.
  static {
    com.google.api.client.util.Preconditions.checkState(
        com.google.api.client.googleapis.GoogleUtils.MAJOR_VERSION == 1 &&
        com.google.api.client.googleapis.GoogleUtils.MINOR_VERSION >= 15,
        "You are currently running with version %s of google-api-client. " +
        "You need at least version 1.15 of google-api-client to run version " +
        "1.16.0-rc of the agronome library.", com.google.api.client.googleapis.GoogleUtils.VERSION);
  }

  /**
   * The default encoded root URL of the service. This is determined when the library is generated
   * and normally should not be changed.
   *
   * @since 1.7
   */
  public static final String DEFAULT_ROOT_URL = "https://agrono-me.appspot.com/_ah/api/";

  /**
   * The default encoded service path of the service. This is determined when the library is
   * generated and normally should not be changed.
   *
   * @since 1.7
   */
  public static final String DEFAULT_SERVICE_PATH = "agronome/v1/";

  /**
   * The default encoded base URL of the service. This is determined when the library is generated
   * and normally should not be changed.
   */
  public static final String DEFAULT_BASE_URL = DEFAULT_ROOT_URL + DEFAULT_SERVICE_PATH;

  /**
   * Constructor.
   *
   * <p>
   * Use {@link Builder} if you need to specify any of the optional parameters.
   * </p>
   *
   * @param transport HTTP transport, which should normally be:
   *        <ul>
   *        <li>Google App Engine:
   *        {@code com.google.api.client.extensions.appengine.http.UrlFetchTransport}</li>
   *        <li>Android: {@code newCompatibleTransport} from
   *        {@code com.google.api.client.extensions.android.http.AndroidHttp}</li>
   *        <li>Java: {@link com.google.api.client.googleapis.javanet.GoogleNetHttpTransport#newTrustedTransport()}
   *        </li>
   *        </ul>
   * @param jsonFactory JSON factory, which may be:
   *        <ul>
   *        <li>Jackson: {@code com.google.api.client.json.jackson2.JacksonFactory}</li>
   *        <li>Google GSON: {@code com.google.api.client.json.gson.GsonFactory}</li>
   *        <li>Android Honeycomb or higher:
   *        {@code com.google.api.client.extensions.android.json.AndroidJsonFactory}</li>
   *        </ul>
   * @param httpRequestInitializer HTTP request initializer or {@code null} for none
   * @since 1.7
   */
  public Agronome(com.google.api.client.http.HttpTransport transport, com.google.api.client.json.JsonFactory jsonFactory,
      com.google.api.client.http.HttpRequestInitializer httpRequestInitializer) {
    this(new Builder(transport, jsonFactory, httpRequestInitializer));
  }

  /**
   * @param builder builder
   */
  Agronome(Builder builder) {
    super(builder);
  }

  @Override
  protected void initialize(com.google.api.client.googleapis.services.AbstractGoogleClientRequest<?> httpClientRequest) throws java.io.IOException {
    super.initialize(httpClientRequest);
  }

  /**
   * An accessor for creating requests from the Proveedor collection.
   *
   * <p>The typical use is:</p>
   * <pre>
   *   {@code Agronome agronome = new Agronome(...);}
   *   {@code Agronome.Proveedor.List request = agronome.proveedor().list(parameters ...)}
   * </pre>
   *
   * @return the resource collection
   */
  public Proveedor proveedor() {
    return new Proveedor();
  }

  /**
   * The "proveedor" collection of methods.
   */
  public class Proveedor {

    /**
     * Create a request for the method "proveedor.consultarproveedorporusuario".
     *
     * This request holds the parameters needed by the the agronome server.  After setting any optional
     * parameters, call the {@link Consultarproveedorporusuario#execute()} method to invoke the remote
     * operation.
     *
     * @param usuario
     * @return the request
     */
    public Consultarproveedorporusuario consultarproveedorporusuario(java.lang.String usuario) throws java.io.IOException {
      Consultarproveedorporusuario result = new Consultarproveedorporusuario(usuario);
      initialize(result);
      return result;
    }

    public class Consultarproveedorporusuario extends AgronomeRequest<com.appspot.agrono_me.agronome.model.ProveedorDTO> {

      private static final String REST_PATH = "consultarProveedorPorUsuario/{usuario}";

      /**
       * Create a request for the method "proveedor.consultarproveedorporusuario".
       *
       * This request holds the parameters needed by the the agronome server.  After setting any
       * optional parameters, call the {@link Consultarproveedorporusuario#execute()} method to invoke
       * the remote operation. <p> {@link Consultarproveedorporusuario#initialize(com.google.api.client.
       * googleapis.services.AbstractGoogleClientRequest)} must be called to initialize this instance
       * immediately after invoking the constructor. </p>
       *
       * @param usuario
       * @since 1.13
       */
      protected Consultarproveedorporusuario(java.lang.String usuario) {
        super(Agronome.this, "POST", REST_PATH, null, com.appspot.agrono_me.agronome.model.ProveedorDTO.class);
        this.usuario = com.google.api.client.util.Preconditions.checkNotNull(usuario, "Required parameter usuario must be specified.");
      }

      @Override
      public Consultarproveedorporusuario setAlt(java.lang.String alt) {
        return (Consultarproveedorporusuario) super.setAlt(alt);
      }

      @Override
      public Consultarproveedorporusuario setFields(java.lang.String fields) {
        return (Consultarproveedorporusuario) super.setFields(fields);
      }

      @Override
      public Consultarproveedorporusuario setKey(java.lang.String key) {
        return (Consultarproveedorporusuario) super.setKey(key);
      }

      @Override
      public Consultarproveedorporusuario setOauthToken(java.lang.String oauthToken) {
        return (Consultarproveedorporusuario) super.setOauthToken(oauthToken);
      }

      @Override
      public Consultarproveedorporusuario setPrettyPrint(java.lang.Boolean prettyPrint) {
        return (Consultarproveedorporusuario) super.setPrettyPrint(prettyPrint);
      }

      @Override
      public Consultarproveedorporusuario setQuotaUser(java.lang.String quotaUser) {
        return (Consultarproveedorporusuario) super.setQuotaUser(quotaUser);
      }

      @Override
      public Consultarproveedorporusuario setUserIp(java.lang.String userIp) {
        return (Consultarproveedorporusuario) super.setUserIp(userIp);
      }

      @com.google.api.client.util.Key
      private java.lang.String usuario;

      /**

       */
      public java.lang.String getUsuario() {
        return usuario;
      }

      public Consultarproveedorporusuario setUsuario(java.lang.String usuario) {
        this.usuario = usuario;
        return this;
      }

      @Override
      public Consultarproveedorporusuario set(String parameterName, Object value) {
        return (Consultarproveedorporusuario) super.set(parameterName, value);
      }
    }
    /**
     * Create a request for the method "proveedor.consultarproveedortag".
     *
     * This request holds the parameters needed by the the agronome server.  After setting any optional
     * parameters, call the {@link Consultarproveedortag#execute()} method to invoke the remote
     * operation.
     *
     * @param tagname
     * @return the request
     */
    public Consultarproveedortag consultarproveedortag(java.lang.String tagname) throws java.io.IOException {
      Consultarproveedortag result = new Consultarproveedortag(tagname);
      initialize(result);
      return result;
    }

    public class Consultarproveedortag extends AgronomeRequest<com.appspot.agrono_me.agronome.model.ProveedorDTOCollection> {

      private static final String REST_PATH = "consultarProveedorPorTag/{tagname}";

      /**
       * Create a request for the method "proveedor.consultarproveedortag".
       *
       * This request holds the parameters needed by the the agronome server.  After setting any
       * optional parameters, call the {@link Consultarproveedortag#execute()} method to invoke the
       * remote operation. <p> {@link Consultarproveedortag#initialize(com.google.api.client.googleapis.
       * services.AbstractGoogleClientRequest)} must be called to initialize this instance immediately
       * after invoking the constructor. </p>
       *
       * @param tagname
       * @since 1.13
       */
      protected Consultarproveedortag(java.lang.String tagname) {
        super(Agronome.this, "POST", REST_PATH, null, com.appspot.agrono_me.agronome.model.ProveedorDTOCollection.class);
        this.tagname = com.google.api.client.util.Preconditions.checkNotNull(tagname, "Required parameter tagname must be specified.");
      }

      @Override
      public Consultarproveedortag setAlt(java.lang.String alt) {
        return (Consultarproveedortag) super.setAlt(alt);
      }

      @Override
      public Consultarproveedortag setFields(java.lang.String fields) {
        return (Consultarproveedortag) super.setFields(fields);
      }

      @Override
      public Consultarproveedortag setKey(java.lang.String key) {
        return (Consultarproveedortag) super.setKey(key);
      }

      @Override
      public Consultarproveedortag setOauthToken(java.lang.String oauthToken) {
        return (Consultarproveedortag) super.setOauthToken(oauthToken);
      }

      @Override
      public Consultarproveedortag setPrettyPrint(java.lang.Boolean prettyPrint) {
        return (Consultarproveedortag) super.setPrettyPrint(prettyPrint);
      }

      @Override
      public Consultarproveedortag setQuotaUser(java.lang.String quotaUser) {
        return (Consultarproveedortag) super.setQuotaUser(quotaUser);
      }

      @Override
      public Consultarproveedortag setUserIp(java.lang.String userIp) {
        return (Consultarproveedortag) super.setUserIp(userIp);
      }

      @com.google.api.client.util.Key
      private java.lang.String tagname;

      /**

       */
      public java.lang.String getTagname() {
        return tagname;
      }

      public Consultarproveedortag setTagname(java.lang.String tagname) {
        this.tagname = tagname;
        return this;
      }

      @Override
      public Consultarproveedortag set(String parameterName, Object value) {
        return (Consultarproveedortag) super.set(parameterName, value);
      }
    }

  }

  /**
   * Builder for {@link Agronome}.
   *
   * <p>
   * Implementation is not thread-safe.
   * </p>
   *
   * @since 1.3.0
   */
  public static final class Builder extends com.google.api.client.googleapis.services.json.AbstractGoogleJsonClient.Builder {

    /**
     * Returns an instance of a new builder.
     *
     * @param transport HTTP transport, which should normally be:
     *        <ul>
     *        <li>Google App Engine:
     *        {@code com.google.api.client.extensions.appengine.http.UrlFetchTransport}</li>
     *        <li>Android: {@code newCompatibleTransport} from
     *        {@code com.google.api.client.extensions.android.http.AndroidHttp}</li>
     *        <li>Java: {@link com.google.api.client.googleapis.javanet.GoogleNetHttpTransport#newTrustedTransport()}
     *        </li>
     *        </ul>
     * @param jsonFactory JSON factory, which may be:
     *        <ul>
     *        <li>Jackson: {@code com.google.api.client.json.jackson2.JacksonFactory}</li>
     *        <li>Google GSON: {@code com.google.api.client.json.gson.GsonFactory}</li>
     *        <li>Android Honeycomb or higher:
     *        {@code com.google.api.client.extensions.android.json.AndroidJsonFactory}</li>
     *        </ul>
     * @param httpRequestInitializer HTTP request initializer or {@code null} for none
     * @since 1.7
     */
    public Builder(com.google.api.client.http.HttpTransport transport, com.google.api.client.json.JsonFactory jsonFactory,
        com.google.api.client.http.HttpRequestInitializer httpRequestInitializer) {
      super(
          transport,
          jsonFactory,
          DEFAULT_ROOT_URL,
          DEFAULT_SERVICE_PATH,
          httpRequestInitializer,
          false);
    }

    /** Builds a new instance of {@link Agronome}. */
    @Override
    public Agronome build() {
      return new Agronome(this);
    }

    @Override
    public Builder setRootUrl(String rootUrl) {
      return (Builder) super.setRootUrl(rootUrl);
    }

    @Override
    public Builder setServicePath(String servicePath) {
      return (Builder) super.setServicePath(servicePath);
    }

    @Override
    public Builder setHttpRequestInitializer(com.google.api.client.http.HttpRequestInitializer httpRequestInitializer) {
      return (Builder) super.setHttpRequestInitializer(httpRequestInitializer);
    }

    @Override
    public Builder setApplicationName(String applicationName) {
      return (Builder) super.setApplicationName(applicationName);
    }

    @Override
    public Builder setSuppressPatternChecks(boolean suppressPatternChecks) {
      return (Builder) super.setSuppressPatternChecks(suppressPatternChecks);
    }

    @Override
    public Builder setSuppressRequiredParameterChecks(boolean suppressRequiredParameterChecks) {
      return (Builder) super.setSuppressRequiredParameterChecks(suppressRequiredParameterChecks);
    }

    @Override
    public Builder setSuppressAllChecks(boolean suppressAllChecks) {
      return (Builder) super.setSuppressAllChecks(suppressAllChecks);
    }

    /**
     * Set the {@link AgronomeRequestInitializer}.
     *
     * @since 1.12
     */
    public Builder setAgronomeRequestInitializer(
        AgronomeRequestInitializer agronomeRequestInitializer) {
      return (Builder) super.setGoogleClientRequestInitializer(agronomeRequestInitializer);
    }

    @Override
    public Builder setGoogleClientRequestInitializer(
        com.google.api.client.googleapis.services.GoogleClientRequestInitializer googleClientRequestInitializer) {
      return (Builder) super.setGoogleClientRequestInitializer(googleClientRequestInitializer);
    }
  }
}
